const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const next = require('next');
const cache = require('./cache');
const { configSession, defaultSessionData } = require('./session');
const authApi = require('./authApi');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
const port = 3000;

module.exports = app.prepare()
  .then(() => server
    .use('/locales', express.static(path.join(__dirname, '/../locales')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(configSession) // TODO - check headers error
    .use(defaultSessionData)
    .use(authApi)
    .use(cache(app))
    .use((req, res) => handle(req, res)))
  .then(() => server.listen(port, () => console.log(`> Ready on http://localhost:${port}`)))
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
