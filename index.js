require('dotenv/config');
require('./index');
const Koa = require('koa');
const cors = require('@koa/cors');
const routerApi = require('./Routes');
const app = new Koa();

app.use(async (ctx, next) => {
  ctx.body = {
    response: 'ok',
  };
  await next();
});

//app.use(jwt({ secret: secret }).unless({
//  path: [
//    '/users/login',
//    { url: '/', methods: ['GET', 'PUT','POST']  }
//  ]
//}))
// app.use(function(ctx, next){
//   return next().catch((err) => {
//     if (401 == err.status) {
//       ctx.status = 401;
//       ctx.body = 'Protected resource, use Authorization header to get access\n';
//     } else {
//       throw err;
//     }
//   });
// });

//app.use(jwt({ secret: 'shared-secret' }));

// Protected middleware
// app.use(function(ctx){
//   if (ctx.url.match(/^\/api/)) {
//     ctx.body = 'protected\n';
//   }
// });

const whitelist = ['http://localhost:3000', 'https://pear.io', 'https://pear.app'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log(origin);
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  allowHeaders: ['x-api-key'],
};
routerApi(app);
app.use(cors({ corsOptions }));

app.listen(process.env.PORT);
