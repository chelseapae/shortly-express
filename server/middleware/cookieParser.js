const parseCookies = (req, res, next) => {
  if (req.headers.cookie !== undefined) {
    var strings = req.headers.cookie.split('; ')
    var cookieObj = {};
    for (var i = 0; i < strings.length; i++) {
      var str = strings[i].split('=');
      cookieObj[str[0]] = str[1]
    }
    req.cookies = cookieObj;
    next()
  } else {
    req.cookies = {};
    next()
  }
};

module.exports = parseCookies;