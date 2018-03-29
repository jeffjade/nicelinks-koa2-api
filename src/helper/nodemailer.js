let nodemailer  = require("nodemailer"),
  path = require('path'),
  fs = require("fs"),
  user = require("./../config/secret").user,
  pass = require("./../config/secret").pass

let smtpTransport = nodemailer.createTransport({
  host: "smtp.163.com",
  secure: true,
  auth: {
    user: user,
    pass: pass
  }
})

let typeList = {
  active: {
    title: 'Welcome to join Us！',
    desc: 'Welcome to join Nice Links, in order to ensure the normal use, please within 24 hours, click the following link to complete the mail verification.',
    button: 'Activate Account'
  },
  reset: {
    title: 'Forgot Your Password?',
    desc: 'It happens. Click the link below to reset your password.',
    button: 'Reset Password'
  },
  notice: {
    title: 'Audit Notice',
    desc: 'Congratulations, the link you submitted at <a href="https://nicelinks.site">NICE LINKS</a> has been approved; you can click the button below to see.',
    button: 'Visit View'
  }
}

let mailTemp = fs.readFileSync(path.join(__dirname, './../../views/mailTemp.html'),{encoding:'utf-8'})

let sendMail = (params = {}) => {
  let htmlBody = mailTemp
    .replace('#TITLE#', typeList[params.type].title)
    .replace('#DESC#', typeList[params.type].desc)
    .replace('#BUTTON#', typeList[params.type].button)
    .replace('#LINK#', params.link)

  let subject = typeList[params.type].desc
  smtpTransport.sendMail({
    from    : params.from || `倾城之链<${user}>`,
    to      : params.to || '<1259134802@qq.com>',
    subject : 'Welcome To Join NICE LINKS ！',
    html    : htmlBody || 'https://jeffjade.com'
  }, function(err, res) {
      if (err) {
        console.log(err, res)
      } else {
        params.callback && params.callback()
      }
  })
}

module.exports = sendMail