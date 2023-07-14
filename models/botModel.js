const db = require('../config/db');
const otpGenerator = require('otp-generator');

class botModel {
  constructor(id, email, name, content) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.content = content;
    this.otp = otpGenerator.generate(6, { upperCaseAlphabets: true, specialChars: false });
    this.date_created = new Date(); // Track the creation time of the OTP as a Date object
  }

  // CREATE USER INFO
  async INSERT() {
    let sql = `
       INSERT INTO chatbot_tb (conversation_id, email, name, otp, date_created)
       VALUES (
        '${this.id}',
        '${this.email}',
        '${this.name}',
        '${this.otp}',
        '${this.date_created}' // Convert Date object to MySQL DATETIME format
       );
    `;
    const [res, _] = await db.execute(sql);
    return res;
  }

  // MODEL METHODS FOR OTP VERIFICATION
  static async RETRIEVE_OTP(id) {
    let sql = `SELECT otp, otp_created_at FROM chatbot_tb WHERE conversation_id = ${id}'`;
    return db.execute(sql);
  }

  static async VERIFIED_OTP(id) {
    let sql = `UPDATE chatbot_tb SET active ='YES' WHERE conversation_id = '${id}'`;
    await db.execute(sql);
  }

  static async CHECK_EXISTS(email) {
    let sql = `
        SELECT EXISTS (
            SELECT 1
            FROM chatbot_tb
            WHERE email = '${email}'
        ) AS value_exists;
        `;
    try {
      const [rows] = await db.execute(sql);
      const valueExists = rows[0].value_exists;
      return valueExists;
    } catch (error) {
      throw error;
    }
  }

    static async UPDATE_CONTENT(id, message) {
        let sql = `
        UPDATE chatbot_tb
        SET content = CONCAT(content, '${message}, ')
        WHERE conversation_id = "${id} AND active = "yes";`
        try{
            await db.execute(sql)
        }
        catch(error){
            throw new Error(error.message)
        }
    }
}

module.exports = botModel



