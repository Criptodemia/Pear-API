const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const brokersDao = require('../DAO/brokersDao.js');

const brokers = new Koa();
const brokersRouter = new Router();

brokersRouter
  .get('/', cors(), async (ctx) => {
    let data = await brokersDao.allBrokers();
    ctx.body = {
      code: 1,
      data: data,
      mesg: 'ok',
    };
  })
  .get('/:id', cors(), async (ctx) => {
    const { id } = ctx.params;
    let data = await brokersDao.getBroker(id);
    ctx.body = {
      code: 1,
      data: data,
      mesg: 'ok',
    };
  });

brokers.use(brokersRouter.routes());
brokers.use(brokersRouter.allowedMethods());

module.exports = brokers;
