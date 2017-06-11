let { join } = require('path')

let config = {
env: 'development',

// Secret key for JWT signing and encryption
'secret': 'super secret passphrase',

// Database connection information
'database': 'mongodb://localhost:27017/nice_links',

// Setting port for server
'port': process.env.PORT || 4000,

// Avatar upload path
'avatarUploadDir': join(__dirname, 'upload/avatar'),

//  Email path
'clientPath': 'http://localhost:8888'
}

if (process.env.NODE_ENV === 'production') {
  config.env = production
  config.clientPath = 'http://nicelinks.site'
}

module.exports = config
