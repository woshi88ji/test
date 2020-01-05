const mysql = require('mysql')
const co = require('co-mysql')
const { DB } = require('../config')

let coon = mysql.createPool({
  host: DB.DB_HOST,
  user: DB.DB_USER,
  password: DB.DB_PASS,
  database: DB.DB_NAME

})

module.exports = co(coon)