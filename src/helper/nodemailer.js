let nodemailer  = require("nodemailer"),
  path = require('path'),
  fs = require("fs"),
  secretConf = require("./../config/secret")

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

  // 对于是使用“QQ”邮箱注册用户，则使用"QQ"邮箱发送激活邮件；其他则 163 邮箱；
  const isQQRegister = params.to.indexOf('@qq.com') > -1
  const authConf = isQQRegister ? secretConf.email_qq : secretConf.email_163
  
  let smtpTransport = nodemailer.createTransport({
    host: isQQRegister ? 'smtp.qq.com' : 'smtp.163.com',
    secure: true,
    auth: {
      user: authConf.account,
      pass: authConf.password
    }
  })

  smtpTransport.sendMail({
    from    : params.from || `倾城之链<${authConf.account}>`,
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