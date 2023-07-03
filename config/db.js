const {Pool} = require('pg')
const dotenv = require('dotenv').config({path: '../.env'})

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
        rejectUnauthorized: false
    }
})

let sql = `
INSERT INTO chatbot_tb (email, name, content)
VALUES (
 'jak@email.com',
 'jak',
);
`

pool.query(sql, (err, res)=>{
    if (err) throw err
    console.log(res)
})

module.exports = pool