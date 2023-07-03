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

    static SELECT_EXISTS(email) {
        let sql = `
        SELECT EXISTS (
            SELECT 1
            FROM chatbot_tb
            WHERE email = '${email}'
        ) AS value_exists;
        `
        return db.execute(sql)[0]
        }

    static UPDATE(contentArr) {
        let sql = `
        UPDATE chatbot_tb
        SET content = '${contentArr}'
        WHERE email = ${this.email};`
    }
}

module.exports = botModel





// const {DataTypes} = require('sequelize')

// const userModel = sequelize.define('userModel',{
//     conversation_id: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         defaultValue: nullull
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         defaultValue: null
//     },
//     name:{
//         type: DataTypes.STRING,
//         allowNull: true,
//         defaultValue: null
//     },
//     content: {
//         type: DataTypes.ARRAY,
//         allowNull: true,
//         defaultValue: null
//     }
// })

// module.exports = userModel;
