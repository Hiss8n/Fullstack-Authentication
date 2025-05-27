

const mongoose=require("mongoose");

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,"plese enter email"]
    },
    password:{
        type:String,
        required:[true,"Please enter your passowrd to continue"],
        minLength:6
    },
    name:{
        type:String,
        required:[true,'Please add your name']
    },
    lastLogin:{
        type:Date,
        default:Date.now
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:String,
    resetPasswordTokenExpiredAt:Date,
    verificationToken:String,
    verificationTokenExpiredAt:Date

},{timestamps:true})

const user=mongoose.model("User",userSchema);
module.exports=user;