const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
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
const userModel = mongoose.model("Model", userSchema);
module.exports = userModel;
