
import {motion} from "framer-motion"
import Input from "../components/Input"
import { Loader, Lock, Mail, User } from "lucide-react"
import { useState } from "react"
import { Link, useNavigate} from "react-router-dom"
import PasswordStrenghtMeter from "../components/PasswordStrenghtMeter"
import { useAuthStore } from "../store/AuthStore"


const SignUpPages=()=> {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate()

    const {signup,error,isLoading}=useAuthStore()

    const handleSignUp= async(e)=>{
        e.preventDefault()
        try {
            await signup(email,password,name)
            navigate("/verify-email");
            
            
        } catch (error) {
            console.log(error)
            
        }
    }
  return (
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className="max-w-md w-full bg-green-600 bg-opacity-80  backdrop-filter backdrop-blur-2xl rounded-xl shadow-xl"
    
    >
<div className="p-6">
    <h2 className="text-3xl mb-3 text-bold text-center  pink-800 text-pink-500 shadow-2xl">Create Account</h2>
<form onSubmit={handleSignUp}>
    <Input
    icon={User}
    onChange={(e)=>setName(e.target.value)}
    value={name}
    placeholder='full name'
    
    />
        <Input
    icon={Mail}
    onChange={(e)=>setEmail(e.target.value)}
    value={email}
    placeholder='email address'
    
    />
        <Input
    icon={Lock}
    onChange={(e)=>setPassword(e.target.value)}
    value={password}
    placeholder='Enter password'
    
    />

    {/* Password strength meter */}
{error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
<PasswordStrenghtMeter password={password}/>
    <motion.button
    className="mt-8 w-full py-1 bg-gradient-to-r from-pink-500 to-pink-700 text-whiey
    font-bold text-2xl text-white rounded-lg shadow-lg hover:from-pink-600 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:offset-2
    focus:ring-offset-gray-500 transition duration-200"
    whileHover={{scale:1.02}}
    whileTap={{scale:0.98}}
    type="submit"
    disabled={isLoading}
    >
   {isLoading ? <Loader className=" animate-spin mx-auto " size={24}/>:"Sign Up"}
    </motion.button>

</form>
</div>
<div className="px-8 py-2 bg-gray-200 bg-opacity-50 flex justify-center">
  <p className="text-sm text-gray-900">Already have an account? {""}</p>
  <Link to={"/login"} className="text-pink-500 text-sm focus:underline">Login</Link>
</div>

    </motion.div>
  )
}

export default SignUpPages