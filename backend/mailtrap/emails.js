/* const { VERIFICATION_EMAIL_TEMPLATE ,WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE} = require("./EmailTempletes") 


const {mailtrapClient,sender}=require("../mailtrap/mailtrap.config");




 const sendVerificationEmail=async(email,verificationToken)=>{
        const recipients=[email]
        

        try {
            const response= await mailtrapClient.sendMail({
                from:sender,
                to:recipients,
                subject:"Verify your email",
                html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
                category:'Email verification'
            })
            console.log("Email sent successfully",response)
            
        } catch (error) {
            console.error(`Erro sending verification email:${error}`)
            throw new Error(`Erro sending verification email:${error}`)
            
        }
       }



const sendWelcomeEmail=async(email,username)=>{
    const recipients=[email]

    try {
        const response= await mailtrapClient.sendMail({
           from:sender,
            to:recipients,
            subject:"Welcome to Tutu Co",
            html:WELCOME_EMAIL_TEMPLATE.replace("{image}",`${username}`),
            category:'Welcome'  
        })
        console.log(response)
        
    } catch (error) {
        console.error(`Error sending welcome email :${error}`)
        return `Error sending welcome email :${error}`
        
    }

}  

const sendPasswordResetEmail=async(email,resetURL)=>{
    const recipients=[email]

    try {
        const response=await mailtrapClient.sendMail({
            from:sender,
            to:recipients,
            subject:"Reset your password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetURL)
        })
        console.log(response)
        
    } catch (error) {
        console.error("error",error.messaeg)
        res.status(500).json({seccess:false,messaeg:"server error,cannot send reset password email now"})
    }
}

const sendPasswordResetSuccessEmail=async(email)=>{
    const recipients=[email]
    try {
        const response= await mailtrapClient.sendMail({
            from:sender,
            to:recipients,
            subject:'You seccessfully reseted your password',
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:'password reset success',
        })
        console.log(response)
        
    } catch (error) {
        console.error("Error",error.message)
        res.status(500).json({success:false,message:'sever error, can not send this email now'})
        
    }
}

module.exports={
    sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendPasswordResetSuccessEmail
} */