'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LabSchema = new Schema({
  name: String,
  version: String,
  description: String
});

mongoose.model('Lab', LabSchema);

