const parseCookies = (req, res, next) => {
  if (req.headers.cookie !== undefined) {
    var strings = req.headers.cookie.split('; ')
    var cookieObj = {};
    for (var i = 0; i < strings.length; i++) {
      var str = strings[i].split('=');
      cookieObj[str[0]] = str[1]
    }
    req.cookies = cookieObj;
    return next()
  } else {
    return next()
  }
  res.end()
};

module.exports = parseCookies;