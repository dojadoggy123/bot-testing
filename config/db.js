const mysql = require('mysql2')
const dotenv = require('dotenv').config()

// documentation - https://www.npmjs.com/package/mysql2

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})

let sql = "SELECT * FROM chatbot_tb;"

pool.execute(sql, (err, res)=>{
    if (err) throw err
    console.log(res)
})

module.exports = pool.promise()