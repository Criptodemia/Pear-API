const Koa = require('koa');
const Router = require('@koa/router');
const koaBody = require('koa-body');
const cors = require('@koa/cors');
const userDao = require('../DAO/userDao.js');
// const bcrypt = require('bcrypt');
const jwt = require('koa-jwt');
const jsonwebtoken = require('jsonwebtoken');
const { checkAuth, checkToken } = require('../Middleware/auth.handler.js');
const { responseHandler } = require('../Middleware/response.handler.js');
const { validation } = require('../Middleware/validator.handler');
const users = new Koa();
const userRouter = new Router();
const secret = process.env.JWT_SECRET || 'jwt_secret';
const speakeasy = require('speakeasy');

userRouter
  .get('/', cors(), async (ctx) => {
    let data = await userDao.allUsers();
    ctx.body = {
      code: 1,
      data: data,
      mesg: 'ok',
    };
  })
  .get('/byId/:id', cors(), async (ctx) => {
    const { id } = ctx.params;
    let data = await userDao.getById(id);
    ctx.body = {
      code: 1,
      data: data,
      mesg: 'ok',
    };
  });
// .post('/login', cors(), koaBody(), async (ctx) => {
//   console.log('entra');
//   if (checkAuth(ctx)) {
//     const { email, password } = ctx.request.body;

//     if (validation(email, 'email') || validation(email, 'twitter')) {
//       let passwordHashed = await userDao.getPassword(email);
//       if (passwordHashed) {
//         const validPassword = await bcrypt.compare(password, passwordHashed.Password);

//         if (validPassword) {
//           const id = passwordHashed.Id;
//           const speaktoken = speakeasy.generateSecret({ length: 20 });
//           let codes = await userDao.getCodes(id);

//           if (codes.Code_base32 === '' || codes.Code_qr === '') {
//             codes.Code_base32 = await userDao.insertCodeBase32(id, speaktoken.base32);
//             codes.Code_qr = await userDao.insertCodeQr(id, speaktoken.otpauth_url);
//           } else {
//             codes.Code_base32 = '';
//             codes.Code_qr = '';
//           }

//           ctx.status = 200;
//           ctx.body = {
//             code: 1,
//             token: jsonwebtoken.sign(
//               {
//                 data: passwordHashed.Id,
//                 //exp in seconds
//                 //exp: Math.floor(Date.now() / 1000) - (60 * 60) // 60 seconds * 60 minutes = 1 hour
//               },
//               secret
//             ),
//             username: passwordHashed.Username,
//             id: passwordHashed.Id,
//             role: passwordHashed.FK_Role,
//             code_qr: codes.Code_qr,
//             code_base32: codes.Code_base32,
//           };
//         } else {
//           responseHandler(203, ctx);
//         }
//       } else {
//         responseHandler(203, ctx);
//       }
//     } else {
//       responseHandler(400, ctx);
//     }
//   } else {
//     responseHandler(401, ctx);
//   }
// })
// .post('/public/register', cors(), koaBody(), async (ctx) => {
//   const { username, email, password } = ctx.request.body;
//   password2 = await bcrypt.hash(password, salt);
//   const emailCheck = await userDao.getByEmail(email);
//   if (emailCheck == null) {
//     let data = await mysql.register(username, email, password2);
//     console.log('data register', data);
//     if (data) {
//       ctx.status = 200;
//       ctx.body = {
//         code: 1,
//         message: 'Succesfull',
//       };
//     } else {
//       ctx.status = 200;
//       ctx.body = {
//         code: 0,
//         message: 'Failed',
//       };
//     }
//   } else {
//     ctx.status = 200;
//     ctx.body = {
//       code: 0,
//       message: 'Email exists',
//     };
//   }
// });

users.use(userRouter.routes());

users.use(
  cors({
    origin: '*',
  })
);

users.use(jwt({ secret: secret }));

users.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT');
  await next();
});

module.exports = users;
