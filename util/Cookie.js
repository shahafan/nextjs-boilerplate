/* global document */
/* eslint-disable no-multi-assign */
const cookie = require('cookie');

let svc;
module.exports = svc = {
  parseCookies(ctx = {}, options = {}) {
    return cookie.parse(
      ctx.req && ctx.req.headers.cookie
        ? ctx.req.headers.cookie
        : document.cookie,
      options,
    );
  },
  set(ctx = {}, name, value, options = {}) {
    const newCookie = cookie.serialize(name, value, options);
    ctx && ctx.res ? ctx.res.setHeader('Set-Cookie', newCookie) : document.cookie = newCookie;
  },
  get(ctx = {}, name, options = {}) {
    return svc.parseCookies(ctx, options)[name];
  },
  has(ctx = {}, name, options = {}) {
    return !!svc.get(ctx, name, options);
  },
  destroy(ctx = {}, name) {
    svc.set(ctx, name, '', {
      maxAge: -1,
    });
  },
};
