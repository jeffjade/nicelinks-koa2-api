module.exports = {
  query (search) {
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

  verifyFingerprintEffective (fingerprint) {
    let regExp = new RegExp("^[A-Za-z0-9]{24}$|^[A-Za-z0-9]{32}$")
    return regExp.test(fingerprint)
  },

  queryString (url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    return url + '?' + str.join('&')
  },

  // 获取当前地址，指定参数的值;
  getUrlParam (url, name) {
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
  }
}
