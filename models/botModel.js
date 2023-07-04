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
       const [res, _] = await db.execute(sql)
       return res
    }

    static async SELECT_EXISTS(email) {
        let sql = `
        SELECT EXISTS (
            SELECT 1
            FROM chatbot_tb
            WHERE email = '${email}'
        ) AS value_exists;
        `
        try {
            const [rows] = await db.execute(sql)
            const valueExists = rows[0].value_exists
            return valueExists
        } catch (error) {
            throw error
        }
    }

    static UPDATE(contentArr) {
        let sql = `
        UPDATE chatbot_tb
        SET content = "${contentArr}"
        WHERE email = "${this.email}";`
        db.execute(sql)
    }
}

module.exports = botModel



