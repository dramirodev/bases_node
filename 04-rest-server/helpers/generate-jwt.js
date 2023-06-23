const JWT = require('jsonwebtoken');

function generateJWT(uid) {
  return new Promise((resolve, reject) => {
    const payload = {uid};

    JWT.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 4
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        resolve(token);
      }

    });
  });
}

module.exports = generateJWT;
