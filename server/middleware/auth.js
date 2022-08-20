const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  // console.log('REQ COOKIES CREATESESSION', req.cookies)
  // console.log('REQ CREATESESSION', req)
  // console.log('RES CREATESESSION', res.cookies)
  if (Object.keys(req.cookies).length === 0) {
    return models.Sessions.create()
    .then((data) => {
      return models.Sessions.get({id: data.insertId})
    })
    .then((data) => {
      req.session = {hash: data.hash};
      var cookie = res.cookie('shortlyid', data.hash)
      req.headers.cookie = cookie;
      next();
    })
    .catch((err) => {
      throw err;
    })
  } else {
    return models.Sessions.get({hash: req.cookies.shortlyid})
    .then((data) => {
      if (data) {
        req.session = {hash: data.hash};
        if (data.user) {
          req.session.user = {}
          req.session.user.username = data.user.username;
          req.session.userId = data.userId;
        }
        next();
      } else {
        return models.Sessions.create()
        .then((data) => {
          return models.Sessions.get({id: data.insertId})
        })
        .then((data) => {
          req.session = {hash: data.hash};
          var cookie = res.cookie('shortlyid', data.hash)
          req.headers.cookie = cookie;
          next();
        })
      }
    })
    .catch((err) => {
      throw err;
    })
  }
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

module.exports.verifySession = (req, res, next) => {
  if (!models.Sessions.isLoggedIn(req.session)) {
    res.redirect('/login')
  } else {
    next()
  }
};