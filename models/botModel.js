const db = require('../config/db')

class botModel{
    constructor(id, email, name, content) {
        this.id = id
        this.email = email
        this.name = name
        this.content = content
    }

    // insert values into sql db
    async INSERT() {
       let sql = `
       INSERT INTO chatbot_tb (conversation_id, email, name, content)
       VALUES (
        '${this.id}',
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

    async UPDATE(contentArr) {
        let sql = `
        UPDATE chatbot_tb
        SET content = "${contentArr}"
        WHERE conversation_id = "${this.id}";`
        
        try{
            console.log("this id gives: "+this.id)
            await db.execute(sql)
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}

module.exports = botModel



