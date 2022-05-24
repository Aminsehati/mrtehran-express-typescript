import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: ""
    },
    lastName: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type:String,
        default:""
    }

}, {
    timestamps: true
})