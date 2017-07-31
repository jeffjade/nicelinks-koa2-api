/*
  DESC：对Date的扩展，将 Date 转化为指定格式的String。
      月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
      年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子：
      (new Date()).Format("YYYY-MM-DD hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
      (new Date()).Format("YYYY-M-D h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/

let http = require('http')
let cheerio = require('cheerio')
let msgConfig = require('./msgConfig.js')

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
        ctx.status = 200
        ctx.body = {
            success: true,
            value: result
        }
    },

    sendFailure(ctx, signStr) {
        console.log(ctx.cookies.set('NiceLinksLoginCookie'))
        ctx.body = {
            success: false,
            message: msgConfig[signStr]['zh']
        }
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

    crawlWebPageByUrl (url, callback) {
        http.get(url, function (res) {
            let data = ''

            res.on('data', function (chunk) {
                data += chunk
            })

            res.on('end', function () {
                callback(null, data)
            })
        }).on('error', function (err) {
            console.log("Opps, Download Error Occurred !" + err)
            callback(err)
        })
    },

    getWebPageInfo (url) {
        return new Promise((resolve, reject) => {
            this.crawlWebPageByUrl(url, (err, body) => {
                try {
                    let $ = cheerio.load(body)
                    console.log($("title").text())
                    console.log($("description").text())
                    if (err) { reject({}) }
                    let result = {
                        title: $("title").text(),
                        desc: $("description").text()
                    }
                    resolve(result)
                } catch (err) {
                    console.log(err)
                    resolve({})
                }
            })
        })
    }
}