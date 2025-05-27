import React, { useEffect, useState } from 'react'
import { Mail,MailCheckIcon, Loader, ArrowLeft, } from 'lucide-react'
import {motion} from "framer-motion"
import Input from '../components/Input'
import { useAuthStore } from '../store/AuthStore'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from "react-hot-toast"



function ForgotPasswordPage() {
    const [email,setEmail]=useState('')
    const [isSubmitted,setIsSubmitted]=useState(true);

    const {isLoading,forgotPassword}=useAuthStore();

    const handleSubmit= async(e)=>{
      e.preventDefault();
        try {
           await forgotPassword(email);
           
           toast.success("Reset password email sent successfully!!")
           setIsSubmitted(!isSubmitted);
        
 /*           setTimeout(()=>{
            navigate('/reset-password/:token')
           },4000) */
         } catch (error) {
          console.log(error)
          toast.error(error.message || "Error reseting email")
        }
       }

       useEffect(()=>{
        handleSubmit()

       },[])
    
  return (
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className="max-w-md w-full bg-green-600 bg-opacity-80 
    backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    
    >
      <div className="p-8">
        <h2 className="text-pink-700  text-2xl mb-6 font-bold flex justify-center ">Forgot password</h2>


        { isSubmitted ? (
         
        <form onSubmit={handleSubmit}>
        <p className='text-gray-800 text-sm text-semibold mb-7'> Enter your registered email address and we'll send you a link to  your inbox to reset your password </p>

          <Input
          icon={Mail}
          type='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder='Enter email'
          required
          
          /> 
         <motion.button
          whileHover={{scale:1.02}}
          whileTap={{scale:.96}}
          type='submit' //button or submit 

          className="mt-12 w-full py-1 bg-gradient-to-r from-pink-500 to-pink-700 text-white
           font-bold text-2xl  rounded-lg shadow-lg hover:from-pink-600 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:offset-2
           focus:ring-offset-gray-500 transition duration-200"
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin  mx-auto"/> : "Send a reset Link"}
          </motion.button>

        </form>

        ) : ( <div className='text-center'>
          <motion.div
          initial={{scale:0}}
          animate={{scale:1}}
          transition={{type:'spring',stiffness:500,damping:30}}
          className='w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4'
          
          >
            <MailCheckIcon className='h-8 w-8 text-white'/>

          </motion.div>
          <p className='text-pink-900 mb-6'>
            If an account exits for {email},you will recieve a password reset link shortly.
          </p>
        
        
        
        </div>)}


 
         
      </div>
      <div className='px-8 py-4 bg-green-800 opacity-150 flex justify-center'>
     
        <Link to='/login' className='text-sm text-pink-400 hover:underline flex items-center' > <ArrowLeft className=' w-4 h-4 mr-2'/> Back to login</Link>
      </div>

    </motion.div>
   
  )
}

export default ForgotPasswordPage;