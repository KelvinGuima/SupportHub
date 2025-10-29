const jwt = require('jsonwebtoken');

function sign(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });
}

function verify(token) {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret');
}

module.exports = { sign, verify };