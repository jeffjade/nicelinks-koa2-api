let { join } = require('path')

export default {
  port: 4000,
  db: {
    host: 'localhost',
    database: 'nice_links',
    username: 'root',
    password: ''
  },
  avatarUploadDir: join(__dirname, 'upload/avatar')
}
