const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('@koa/cors');
const comissionsDao = require('../DAO/comissionsDao.js');

const comissions = new Koa();
const comissionsRouter = new Router();

comissionsRouter
  .get('/', cors(), async (ctx) => {
    let data = await comissionsDao.allComissions();
    ctx.body = {
      code: 1,
      data: data,
      mesg: 'ok',
    };
  })
  .get('/broker/:id', cors(), async (ctx) => {
    const { id } = ctx.params;
    let data = await comissionsDao.getComissionsFromBroker(id);
    ctx.body = {
      code: 1,
      data: data,
      mesg: 'ok',
    };
  });

comissions.use(comissionsRouter.routes());
comissions.use(comissionsRouter.allowedMethods());

module.exports = comissions;
