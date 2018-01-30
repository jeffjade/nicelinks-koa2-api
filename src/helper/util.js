/*
  DESC：对Date的扩展，将 Date 转化为指定格式的String。
      月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
      年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子：
      (new Date()).Format("YYYY-MM-DD hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
      (new Date()).Format("YYYY-M-D h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/

let axios = require('axios')
let cheerio = require('cheerio')
let _ = require('lodash')
let fs = require('fs')
let path = require('path')
let mongoSanitize = require('mongo-sanitize')
let formidable = require('formidable')

let errorMsgConfig = require('./errorMsgConf.js')
let successMsgConfig = require('./successMsgConf.js')
let { UserModel } = require('./../models/index')
let config = require('./../config')


// 原有的mongoSanitize不递归过滤
function mongoSanitizeRecurse (obj) {
  mongoSanitize(obj)
  _.each(obj, v => {
    if (_.isObject(v)) {
      mongoSanitizeRecurse(v)
    }
  })
}

Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1,
    'D+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(Y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

module.exports = {
    sendSuccess(ctx, result) {
        ctx.statstatusus = 200
        ctx.body = {
            success: true,
            value: result
        }
    },

    sendSuccessWithMsg (ctx, signStr, extraParam) {
        let msgVal = successMsgConfig[signStr]['zh']
        msgVal = extraParam ? msgVal.replace('@#', extraParam) : msgVal
        ctx.status = 200
        ctx.body = {
            success: true,
            value: msgVal
        }
    },

    // 安全过滤ctx.query/ctx.request.body等
    sanitize (obj) {
        mongoSanitizeRecurse(obj)
    },

    sendFailure(ctx, signStr, errMsg) {
        ctx.body = {
            success: false,
            message: signStr ? errorMsgConfig[signStr]['zh'] : errMsg
        }
    },

    // findUser：params === {} 即获得所有用户信息；
    findUser (params = {}) {
        return new Promise((resolve, reject) => {
            UserModel.findOne(params, (err, doc) => {
                if (err) {
                    reject(err)
                }
                resolve(doc)
            })
        })
    },

    findUserIdByUsername (username) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({username: username}, (err, foundUser) => {
                if (err) {
                    reject(err)
                }
                resolve(foundUser._id)
            })
        })
    },

    // Role authorization check
    checkRoleByUserId (userId, role) {
        return new Promise((resolve, reject) => {
            try {
                UserModel.findOne({ _id: userId}, (err, foundUser) => {
                    if (err) {
                        return reject(err)
                    }
                    if (foundUser.role === role) {
                        return resolve(true)
                    } else {
                        return resolve(false)
                    }
                })
            }  catch (error) {
                return $util.sendFailure(ctx, null, 'Opps, Something Error :' + error)
            }
        })
    },

    query(search) {
        let str = search || window.location.search
        let objURL = {}

        str.replace(
            new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
            ($0, $1, $2, $3) => {
                objURL[$1] = $3
            }
        )
        return objURL
    },

    formatDate(date, rule = 'YYYY-MM-DD') {
        return date && date.Format(rule) || ''
    },
 
    verifyUserIdEffective(userId) {
        let regExp = new RegExp("^[A-Za-z0-9]{24}$|^[A-Za-z0-9]{32}$")
        return regExp.test(userId)
    },

    queryString(url, query) {
        let str = []
        for (let key in query) {
            str.push(key + '=' + query[key])
        }
        return url + '?' + str.join('&')
    },

    // 获取当前地址，指定参数的值;
    getUrlParam(url, name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
        var r = url.search.substr(1).match(reg)
        if (r != null) {
            return unescape(r[2])
        }
        return null
    },

    getQueryObject(queryStr) {
        var str = queryStr === undefined ? location.search : queryStr;
        var obj = {};
        var reg = /([^?&=]+)=([^?&=]*)/g;
        str.replace(reg, function(match, $1, $2) {
            var name = decodeURIComponent($1);
            var val = decodeURIComponent($2);
            obj[name] = val;
        });
        return obj;
    },

    getWebPageInfo (url) {
        return new Promise((resolve, reject) => {
            return axios.get(url).then((res) => {
                try {
                    let $ = cheerio.load(res.data)
                    let description = $('meta[name="description"]').attr('content')
                    let keywords = $('meta[name="keywords"]').attr('content')
                    let result = {
                        title: $("title").text() || $('meta[og:title"]').attr('content'),
                        keywords: keyword || $('meta[property="og:keywords"]').attr('content') || '',
                        desc:  description || $('meta[property="og:description"]').attr('content')
                    }
                    resolve(result)
                } catch (err) {
                    console.log("Opps, Download Error Occurred !" + err)
                    resolve({})
                }
            }).catch(err => {
                console.log("Opps, Axios Error Occurred !" + err)
                resolve({})
            })
        })
    },

    async saveAvatarAndGetPath (req, imgName){
		return new Promise((resolve, reject) => {
			const form = formidable.IncomingForm()
            form.uploadDir = config.main.avatarUploadDir
            console.log(form.uploadDir)
            try {
                form.parse(req, async (err, fields, files) => {
                    console.log(err, fields, files)
                    const fullName = imgName + path.extname(files.file.name)
                    const repath = config.main.avatarUploadDir + fullName
                    await fs.rename(files.file.path, repath)
                    return resolve(fullName)
                    /*gm(repath)
                    .resize(200, 200, "!")
                    .write(repath, async (err) => {
                        if(err){
                            console.log('裁切图片失败');
                            reject('裁切图片失败');
                            return
                        }
                        resolve(fullName)
                    })*/
                })
            } catch(err){
                console.log('保存图片失败', err)
                fs.unlink(files.file.path)
                return reject('保存图片失败')
            }
		})
	}
}