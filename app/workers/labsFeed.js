#!/usr/bin/env node

'use strict';

var https = require('https'),
  xml2js = require('xml2js'),
  Q = require('q'),
  mongoose = require('mongoose');

// Init DB connection and require models
require('../../db');
var Lab = mongoose.model('Lab');

function parse(xml) {
  var deferred = Q.defer();
  // Parse out retrieved xml
  // explicitArray:false tells the parser to only glob things
  // into arrays if there is more than one.
  xml2js.parseString(xml, {
    explicitArray: false
  }, function(err, result) {
    if (result && result.rss && result.rss.channel && result.rss.channel.item) {
      var labs = [];
      result.rss.channel.item.forEach(function(lab) {
        // Our parsing of each lab
        var lab_id = lab.link.substr(lab.link.lastIndexOf('/') + 1);
        labs.push({
          name: lab.title,
          lab_id: lab_id,
          description: lab.description,
          version: '1.0.0'
        });
      });
      // Resolve deferred with an array of labs
      deferred.resolve(labs);
    }
  });
  return deferred.promise;
}

function save(labs) {
  // Clear out existing labs
  Lab.collection.remove({}, function(err) {
    if (err) {
      // I don't know how this would happen.
      console.log('Error dropping collection?');
      process.exit(1);
      return;
    }
    // so far so good
    console.log('Labs dropped.');
    // Bulk insert our labs
    Lab.collection.insert(labs, function(err, labs) {
      if (err) {
        // Failboat
        console.log('Error saving labs?');
        process.exit(1);
      }
      // All good.
      console.log('Collection saved! Stored ' + labs.length + ' labs in the DB.');
      process.exit(0);
    });
  });
}

var req = https.get('https://access.redhat.com/feeds/labinfo/featured', function(res) {
  var xml = '';
  res.on('data', function(chunk) {
    // Chunk away little guy
    xml += chunk;
  });

  res.on('end', function() {
    // Response is finished.
    parse(xml)
      .then(save);
  });
});
req.on('error', function(err) {
  console.error('Failed downloading xml... ', err);
});
