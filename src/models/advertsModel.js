let mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = mongoose.Schema.ObjectId

/* Solve Problem: (node) DeprecationWarning:
  Mongoose: mpromise (mongoose's default promise library) is deprecated
*/
mongoose.Promise = global.Promise

const AdvertsSchema = new mongoose.Schema({
    path: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    active: {
        type: Boolean,
        default: false,
    },
    sort: {
        type: Number,
        default: 1
    },
    modifyTime: { 
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Adverts', AdvertsSchema)