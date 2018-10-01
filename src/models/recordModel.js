let mongoose = require('mongoose'),
  Schema = mongoose.Schema

mongoose.Promise = global.Promise

const RecordSchema = new Schema({
  key: {
    type: String,
    unique: true,
    required: true
  },
  value: {
    type: Number,
    default: 1314,
    required: true
  },
  created: {
    type: Date,
    default: Date.now()
  },
  updated: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Record', RecordSchema)