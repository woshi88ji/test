const crypto = require('crypto')

let obj = crypto.createHash('md5')

obj.update('123456789liu294859')
console.log(obj.digest('hex'))
