let mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = mongoose.Schema.ObjectId

/* Solve Problem: (node) DeprecationWarning:
  Mongoose: mpromise (mongoose's default promise library) is deprecated
*/
mongoose.Promise = global.Promise

const SentencesSchema = new mongoose.Schema({
  content: {
    type: String,
    unique: true,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: String,
    required: true
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
  modifyTime: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model('Sentences', SentencesSchema)