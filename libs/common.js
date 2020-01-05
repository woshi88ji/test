const crypto = require('crypto')

module.exports = {
  md5(buffer) {
    let hash = crypto.createHash('md5')
    hash.update(buffer)
    return hash.digest('hex')
  }
}