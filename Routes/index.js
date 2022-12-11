const Koa = require('koa');
const mount = require('koa-mount');
const users = require('../Services/users.js');
const brokers = require('../Services/brokers.js');
const comissions = require('../Services/comissions.js');

function routerApi(app) {
  app.use(mount('/users', users));
  app.use(mount('/brokers', brokers));
  app.use(mount('/comissions', comissions));
}

module.exports = routerApi;
