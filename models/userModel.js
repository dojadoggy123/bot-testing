const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
{
        conversation_id: {
            type: String,
            required: [false, "id must be entered here"],
            default: null
        },
        email: {
            type: String,
            required: true
        },
        name:{
            type: String,
            required: false,
            default: null
        },
        content:{
            type: String,
            required: false,
            default: null
        }
    },
    {
        timestamps: true
    }
)

// use and export user model
const userModel = mongoose.model("Model", userSchema);
module.exports = userModel;
