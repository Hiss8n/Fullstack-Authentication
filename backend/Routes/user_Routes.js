
const express=require("express")
const { register,verifyemail, logout,login, forgotPassword, resetPassword,verifyToken,checkAuth } = require("../controllers/auth_controllers")
const router=express.Router()

//check auth on resfres
router.get('/check-auth',verifyToken,checkAuth)


router.post('/register',register);

router.post('/verify-email',verifyemail);

router.post('/logout',logout)

router.post('/login',login)

router.post('/forgot-password',forgotPassword);

router.post('/reset-password/:token',resetPassword)
module.exports=router