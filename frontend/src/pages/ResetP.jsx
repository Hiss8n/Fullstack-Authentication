import { useState } from 'react'
import {motion} from 'framer-motion'
import { useAuthStore } from '../store/AuthStore'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader, Lock } from 'lucide-react';
import{toast} from "react-hot-toast"
import Input from '../components/Input';

const ResetP = () => {
    const [password,setPassword]=useState("")
    const [confirmPassword,setConfirmPassword]=useState("")
    const {isLoading,resetPassword,error,message}=useAuthStore();

    const {token} =useParams();
    const navigate=useNavigate()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        if(password !==confirmPassword){
            alert("password do not match")
            return
        }
        try {
        await resetPassword(token,password);

        toast.success("Password reset successfully!!, redirecting to login page...")
        
        setTimeout(()=>{
            navigate('/login')
        },3000)
        

            
        } catch (error) {
            console.error(error)
            toast.error(error.message || "Error reseting password")
            
        }

    }
  return (
    <motion.div
     initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className='max-w-md w-full bg-gray-500 
    bg-opacity-100 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl 
    overflow-hidden '
    >
        <div className='p-8'>  
        <h2 className='text-3xl font-bold mb-6 text-center
         bg-gradient-to-r from-pink-400 to-pink-200-xl mr-8 rounded-full'>Reset Your password</h2>
         {error  && <p className='text-red-500 mb-4 text-sm'>{error}</p>}
         {message && <p className='text-green-500 mb-4 text-sm'>{message}</p>}
         <form onSubmit={handleSubmit}

         >
            <p className='text-sm font-semibold text-white mb-4 mr-8'>Please enter a new password</p>
            <Input
            icon={Lock}
            type='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='enter new password'
            />

            <Input
            icon={Lock}
            type='password'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            placeholder='confirm your password'
            />

            <motion.button
            whileHover={{scale:1.02}}
            whileTap={{scale:.96}}
            disabled={isLoading}
            className="mt-12 w-full py-1 bg-gradient-to-r from-pink-500 to-pink-700 text-white
            font-bold text-2xl  rounded-lg shadow-lg hover:from-pink-600 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:offset-2
            focus:ring-offset-gray-500 transition duration-200"
            type="submit"
            
            >
                {isLoading ? <Loader className='text-sm w-4 h-4 flex justify-center items-center' /> :  "Set New password"}
            </motion.button>



         </form>
        </div>
    </motion.div>
  )
}

export default ResetP