const jsonwebtoken = require('jsonwebtoken');
const apikeySecure = process.env.APIKEY || 'secure';
const secret = process.env.JWT_SECRET || 'jwt_secret';

function checkAuth(req) {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) return false;
  if (apiKey !== apikeySecure) return false;
  else return true;
}

function checkToken(req, id) {
  let result = false;

  if (!req.headers.authorization) result = false;
  else {
    const token = req.headers.authorization.split(' ')[1];
    jsonwebtoken.verify(token, secret, (err, verifiedJwt) => {
      if (err) {
        console.log('error', err.message);
        result = false;
      } else if (verifiedJwt.data == id) result = true;
    });
  }
  return result;
}

module.exports = { checkAuth, checkToken };
