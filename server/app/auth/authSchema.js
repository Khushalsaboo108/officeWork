const mongoose = require("mongoose")
const authLogin = new mongoose.Schema(
    {
        auth_name: {
            type: String,
            require: true
        },
        auth_email: {
            type: String,
            require: true
        },
        auth_userName: {
            type: String,
            require: true
        },
        auth_password: {
            type: String,
            require: true
        },
        auth_Id:{
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
)

let auth = mongoose.model('auth', authLogin)
module.exports=auth;
