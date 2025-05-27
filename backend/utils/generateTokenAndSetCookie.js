const jwt=require("jsonwebtoken")

const generateTokenAndSetCookie=(res,userId)=>{
    
const token=jwt.sign({userId},process.env.COOKIE_SECRET_KEY,{expiresIn:'7d'})

res.cookie("token",token,{
    httpOnly:true, // xss attack
    secure:process.env.NODE_ENV==="production",
    sameSite:'strict', //against csrf,
    maxAge:7 * 24 * 60 * 60 * 1000
    })

return token
   
}

module.exports=generateTokenAndSetCookie