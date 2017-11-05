const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  ObjectId = mongoose.Schema.ObjectId

// ================================
// linkStoreModel Schema
// ================================
const ActionsSchema = new Schema({
   link_id: {
    type: ObjectId,
    unique: true,
    required: true
  },
  likes_list: {
    type: Object,
    default: {}
  },
  dislikes_list: {
    type: Object,
    default: {}
  },
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() }
})

ActionsSchema.index({ link_id: 1 })

module.exports = mongoose.model('Actions', ActionsSchema)