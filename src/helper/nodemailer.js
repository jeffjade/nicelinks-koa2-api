let nodemailer  = require("nodemailer"),
  user = 'yunjeff@163.com',
  pass = 'your_email_passwd'

let smtpTransport = nodemailer.createTransport( {
  service: "163",
  auth: {
    user: user,
    pass: pass
  }
})

let sendMail = (params = {}) => {
  smtpTransport.sendMail({
    from    : params.from || `Elliott<${user}>`,
    to      : params.to || '<1259134802@qq.com>',
    subject : '欢迎注册 Nice Links',
    html    : params.html || 'www.jeffjade.com'
  }, function(err, res) {
      if (err) {
        console.log(err, res)
      } else {
        params.callback && params.callback()
      }
  })
}

module.exports = sendMail