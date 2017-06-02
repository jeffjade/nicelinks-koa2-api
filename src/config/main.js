let { join } = require('path')

module.exports = {
  // Secret key for JWT signing and encryption
  'secret': 'super secret passphrase',
  
  // Database connection information
  'database': 'mongodb://localhost:27017/nice_links',

  // Setting port for server
  'port': process.env.PORT || 4000,

  // Avatar upload path
  'avatarUploadDir': join(__dirname, 'upload/avatar')
}
