require("dotenv").config();
const bcrypt=require("bcryptjs");
const generateTokenAndSetCookie = require("../utils/generateTokenAndSetCookie");
const jwt=require("jsonwebtoken")

/* const {
    sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendPasswordResetSuccessEmail}=require("../mailtrap/emails.js");
     */
const user=require("../models/User_model.js");
const crypto=require('crypto');

//check auth at refreshing, let me now

const verifyToken=async(req,res,next)=>{
    const token=req.cookies.token;
    
    try {
    if(!token) return res.status(404).json({succeess:false,message:"Invalid token"})
    const decoded= jwt.verify(token,process.env.COOKIE_SECRET_KEY)
 
    if(!decoded)return res.status(400).json({success:false,message:"Invalid or expired token"})
    req.userInfo=decoded;
     
     next()
    } catch (error) {
        console.error("Error",error)
        return res.status(500).json({success:false,message:"server error"})
        
    }

   
   
   
   
}


const checkAuth=async(req,res)=>{

    try {
         const currentUser=await user.findById(req.userInfo.userId).select('-password') 

    

        if(!currentUser) return res.status(404).json({succeess:false,message:"There is now such user!!"})
        
       res.status(200).json({succeess:true,message:'success',currentUser}) 

      
    } catch (error) {
        console.error("Error",error)
        res.status(500).json({success:false,message:'Server error'})
        
    }
}

const register=async(req,res)=>{
    const {email,password,name}=req.body
    
    try {

    if(!email || !password || !name){

    return res.status(400).json({
        succeess:false,
        message:"All fields must be entered to continue"
    })
    }

    const userExisted= await user.findOne({email});
    if(userExisted){
     return res.status(400).json({
        success:false,
        message:"This user is already register, kindly try with a different email address."
        })
        }

        // hash the password before adding to db
        const hashedPassword=  await bcrypt.hash(password,10);

        const verificationToken=Math.floor(100000 + Math.random() * 900000).toString()

        const newUser=new user({
            email,
            password:hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiredAt:Date.now() + 24 * 60 * 60 * 1000
        })
        await newUser.save();

        //jwt, generate jwt cookie-parser
        generateTokenAndSetCookie(res,newUser._id);

        //send verification email

        /* await sendVerificationEmail(newUser.email,verificationToken); */

        

        res.status(201).json({
           succeess:true,
           message:'New user created successfully' ,
           user:{
            ...newUser._doc,
            password:undefined
           }
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            succeess:false,
            message:"Server error, please try again later!!"
        })
    }
}


const verifyemail=async(req,res)=>{
    const {code}=req.body;

    try {
    const newUser= await user.findOne({
        verificationToken:code,
        verificationTokenExpiredAt:{$gt:Date.now()}
    })
    
     if(!newUser){
        return res.status(500).json({succeess:false,message:"Invalid expired.... token"})
    } 

    newUser.isVerified=true,
    newUser.verificationToken=undefined,
    newUser.verificationTokenExpiredAt=undefined 

    newUser.save()

    /* await sendWelcomeEmail(newUser.email,newUser.name) */




    return res.status(201).json({
        succeess:true,
        message:'Email verification done successfully!!',
        user:{
            ...newUser._doc,
            password:undefined
        }
    })
        
    } catch (error) {
        console.error("error",error)
        res.status(500).json({
            Success:false,
            message:"server error"
        })
        
    }


   

    

}


const logout=async(req,res)=>{
    res.clearCookie("token")
    res.status(200).json({success:true,message:"Logged out successfully."})
}

const login=async(req,res)=>{
    const {email,password}=req.body
    try {
        const loginUser= await user.findOne({email});

        if(!loginUser) return res.status(400).json({success:false,message:"Invalid credentials..."});

        const isPasswordCorrect= await bcrypt.compare(password,loginUser.password)

        if(!isPasswordCorrect) return res.status(403).json({success:false,message:"Invalid password"})

         generateTokenAndSetCookie(res,loginUser._id)

        loginUser.lastLogin=new Date()
        await loginUser.save()
        
        return res.status(200).json({
            seccess:true,
            message:"login successfully",
            user:{
                ...loginUser._doc,
                password:undefined,
            }
        })


    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:"Server error, kindly try again later!"})
        
    }
}


const forgotPassword=async(req,res)=>{
    const {email}=req.body;
    try {
        const forgotUser=await user.findOne({email});

        if(!forgotUser) {
            return res.status(400).json({success:false,message:"Invalid email, register to continue"});
        }

        const resetToken=crypto.randomBytes(20).toString("hex");

        const resetTokenExpiredAt=Date.now() + 1 * 60 * 60 * 1000 ///i hour

        forgotUser.resetPasswordToken=resetToken;
        forgotUser.resetPasswordTokenExpiredAt=resetTokenExpiredAt

        await forgotUser.save()

       /*  await sendPasswordResetEmail(forgotUser.email,`${process.env.CLIENT_URL}/reset-password/${resetToken}`); */

        res.status(200).json({success:true,message:'Go to your email inbox to reset your password'})



    } catch (error) {
         return res.status(500).json({
            success:false,
            message:"Error occured,sever error, try again later",error
        })
        
    }
}

const resetPassword=async(req,res)=>{
 

    try {
    const {token}=req.params;
    const {password}=req.body

    const resetUser= await user.findOne({
        resetPasswordToken:token,
        resetPasswordTokenExpiredAt:{$gt:Date.now()}
    })
    if(!resetUser){
        return res.status(500).json({success:false,message:"Invalid token"})
    }

    const hashedPassword=await bcrypt.hash(password,10);
    resetUser.password=hashedPassword,
    resetUser.resetPasswordToken=undefined,
    resetUser.resetPasswordTokenExpiredAt=undefined

    resetUser.save()
     res.status(200).json({success:true,message:"Password reset successfully"})


    /*  await sendPasswordResetSuccessEmail(resetUser.email) */
      
    } catch (error) {
        
    }
}

module.exports={register,verifyemail,logout,login,forgotPassword,resetPassword,verifyToken,checkAuth};