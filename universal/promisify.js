module.exports = (obj, method) => (...args) => new Promise((resolve, reject) => {
  const handle = obj[method](...args, (err, res) => (err
    ? reject(err)
    : resolve(Object.assign(res || {}, { handle }))));
});
