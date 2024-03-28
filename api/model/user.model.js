const mongoose  = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    todos: [
        {
            task: {
                type: String,
                required: true
            },
            completed: {
                type: Boolean,
                default: false
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now
    }
});


const User = mongoose.model("User",userSchema);

module.exports = User