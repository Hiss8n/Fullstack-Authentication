import { useState } from "react"
import {motion} from "framer-motion"
import {Mail,Lock,Loader} from "lucide-react"
import {Link} from "react-router-dom"
import Input from "../components/Input"
import { useAuthStore } from "../store/AuthStore"

const LoginPages=()=> {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

 
  
  const {login,isLoading,error,forgotPassword}=useAuthStore();

  const handleLogin= async(e)=>{
    e.preventDefault();
    await forgotPassword

    try {
      
      await login(email,password)
      
    } catch (error) {

      console.log(error)
    }

  }
  return (
    <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
    className="max-w-md w-full bg-green-600 bg-opacity-80 
    backdrop-filter-blur-xl rounded-2xl shadow-xl overflow-hidden"
    
    >
      <div className="p-8">
        <h2 className="text-pink-700  text-2xl mb-6 font-bold flex justify-center ">Welcome Back</h2>

        <form onSubmit={handleLogin}>
          <Input
          icon={Mail}
          type='email'
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          placeholder='Enter email'
          
          />
          <Input
          icon={Lock}
          type='password'
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          placeholder='enter password'
          />
          
          <div className="flex items-center mb-4">
            <Link to='/forgot-password'
            className="text-sm text-green-300 hover:underline"
            >forgot password ? {""}</Link>
          </div>

          {error && <p className="text-red-500 font-semibold mb-2">{error}</p>}

          <motion.button
          whileHover={{scale:1.02}}
          whileTap={{scale:.96}}
          className="mt-12 w-full py-1 bg-gradient-to-r from-pink-500 to-pink-700 text-white
           font-bold text-2xl  rounded-lg shadow-lg hover:from-pink-600 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:offset-2
           focus:ring-offset-gray-500 transition duration-200 cursor-pointer"
           
          type="submit"
          >
            {isLoading ? <Loader className="w-6 h-6 animate-spin  mx-auto"/> : "Login"}
          </motion.button>

        </form>

      </div>
      <div className="px-8 mt-4 py-2 bg-gray-500 bg-opacity-50 flex justify-center">
        <p className="text-sm text-gray-900">Don't have an account ? {""}

          <Link to='/signup' className="text-pink-700 hover:underline">Sign Up</Link>
        </p>
      </div>

    </motion.div>
  )
}

export default LoginPages