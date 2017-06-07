let nodemailer  = require("nodemailer"),
  user = 'nicelinks@163.com',
  pass = 'nicelinks1706'

let smtpTransport = nodemailer.createTransport( {
  service: "smtp.163.com",
  auth: {
    user: user,
    pass: pass
  }
})

let sendMail = (params = {}) => {
  smtpTransport.sendMail({
    from    : params.from || `Nicer<${user}>`,
    to      : params.to || '<1259134802@qq.com>',
    subject : 'Welcome to join Nice Links ！',
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