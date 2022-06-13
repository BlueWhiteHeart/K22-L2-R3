const crypto = require('crypto')

function generateHash (algorithm, data, encoding) {
  return crypto
    .createHash(algorithm)
    .update(data)
    .digest(encoding)
}

exports.MD5 = (data, encoding = 'hex') => {
  return generateHash('md5', data, encoding)
}
