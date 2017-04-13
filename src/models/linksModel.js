import mongoose from 'mongoose'

/* Solve Problem: (node) DeprecationWarning:
  Mongoose: mpromise (mongoose's default promise library) is deprecated
*/
mongoose.Promise = global.Promise

// 定义 LinksSchema 数据表和数据结构
const LinksSchema = new mongoose.Schema({
  url_path: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    default: ''
  },
  tags: {
    type: String,
    required: true
  },
  classify: {
    type: String,
    required: true
  },
  like: {
    type: Number,
    default: 0
  },
  like_ip_arr: {
    type: Object,
    default: {}
  },
  dislike: {
    type: Number,
    default: 0
  },
  dislike_ip_arr: {
    type: Object,
    default: {}
  },
  social: {
    type: Object,
    default: {}
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  }
})

// let BlogModel = mongoose.model('Blog', LinksSchema)

// let option = {
//   url_path: 'http://jeffjade.com',
//   title: '晚晴幽草轩',
//   desc: '效率至上，經世济用',
//   tags: '前端',
//   like: 2
// }

// let blogEntry = new BlogModel(option)
// blogEntry.save(function (error, doc) {
//   if (error) {
//     console.error(error)
//   } else {
//     console.log(doc)
//   }
// })

/*
BlogModel.create(option, function (error, doc) {
  if (error) {
    console.error(error)
  } else {
    console.log(doc)
  }
})
*/

// Find All The Data Test.

// BlogModel.find({}, function (error, docs) {
//   // 若没有向find传递参数，默认的是显示所有文档
//   console.log(error, docs)
// })

// 使用 url_path 字段作为索引
// LinksSchema.index({ url_path: 1 })
export default mongoose.model('Links', LinksSchema)
