const db = require('../config/db')

class botModel{
    constructor(email, name, content) {
        this.email = email
        this.name = name
        this.content = content
    }
    // insert values into sql db
    async INSERT() {
       let sql = `
       INSERT INTO chatbot_tb (email, name, content)
       VALUES (
        '${this.email}',
        '${this.name}',
        '${this.content}'
       );
       `
       const [res, _] = await db.query(sql).rows
       return res
    }

    static SELECT_EXISTS(email) {
        let sql = `
        SELECT EXISTS (
            SELECT 1
            FROM chatbot_tb
            WHERE email = '${email}'
        ) AS value_exists;
        `
        return db.query(sql.rows[0]).rows[0]
        }

    static UPDATE(contentArr) {
        let sql = `
        UPDATE chatbot_tb
        SET content = '${contentArr}'
        WHERE email = ${this.email};
        `
        return db.query(sql).rows[0]
    }
}

module.exports = botModel
