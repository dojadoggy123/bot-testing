const mongoose = require("mongoose");

const user_schema = mongoose.Schema(
    {
        user_id: {
            type: String,
            required: [true, "id must be entered here"]
        },
        content: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

// use and export user model
const userModel = mongoose.model("Model", user_schema);

module.exports = userModel;
