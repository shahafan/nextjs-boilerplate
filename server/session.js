const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { SESSION_SECRET } = require('./config');
const acceptLanguage = require('./acceptLanguage');

// TODO store more persistently (this only survives while deployment is on same machine)
const store = new FileStore({ path: '/tmp/sessions' });

module.exports = {
  configSession: session({
    secret           : SESSION_SECRET,
    store,
    resave           : false,
    rolling          : true,
    saveUninitialized: true,
    httpOnly         : true,
    cookie           : { maxAge: 604800000 }, // week
  }),
  defaultSessionData(req, res, next) {
    if (!req.session.user) {
      req.session.user = {
        locale: acceptLanguage(req),
      };
    }
    next();
  },
};
