import mongoose from 'mongoose'

/* Solve Problem: (node) DeprecationWarning:
  Mongoose: mpromise (mongoose's default promise library) is deprecated
*/
mongoose.Promise = global.Promise

export function connectDatabase (uri) {
  return new Promise((resolve, reject) => {
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      .once('open', () => resolve(mongoose.connections[0]))

    mongoose.connect(uri)
  })
}

connectDatabase('mongodb://127.0.0.1:27017/nice_links')

import Links from './linksModel'
export default { Links }
