const mongoose = require("mongoose");

// Ctreatind a schema
const Schema = mongoose.Schema

const UserScheme = new Schema({
    email: {
        type: String,
        unique: true,
        required: [true, "email exist already!"],
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "{VALUE} is invalid!"
        }
        
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model("User", UserScheme);

