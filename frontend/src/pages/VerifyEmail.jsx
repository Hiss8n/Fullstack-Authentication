import{ useEffect, useRef, useState } from 'react'

import {motion} from "framer-motion"
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/AuthStore'
import toast from 'react-hot-toast'


const VerifyEmail=()=> {

    const [code,setCode]=useState(["","","","","",""])
    const inputRef=useRef([])
    const navigate=useNavigate()
    const {verifyEmail,isLoading,error=false}=useAuthStore();

    const handleChange=(index,value)=>{
        const newCode=[...code]

        /* Handle pasted code */
        if(value.length>1){
            const pastedCode = value.slice(0,6).split("");
            for(let i=0; i<6; i++){
                newCode[i] = pastedCode[i] || ""
            }
            setCode(newCode)

            //focus on the next element
            const lasteFilledIndex=newCode.findLastIndex((digit)=>digit !=="");
            const focusIndex=lasteFilledIndex<5?lasteFilledIndex + 1 : 5;
            inputRef.current[focusIndex].focus()

        } else{
            newCode[index]=value;
            setCode(newCode);


            //Move focus to the input field if the value is entereds
            if(value && index <5){
                inputRef.current[index+1].focus()
            }
           
        }
    }

    const handleKeyDown=(index,e)=>{
        if(e.key==="Backspace" && !code[index] && index > 0 ) {
            inputRef.current[index-1].focus()
        }
        
    }

   const handleSubmit= async(e)=>{
    e.preventDefault()

    const newCode=code.join("")
    try {
        await verifyEmail(newCode)
        navigate("/")
        toast.success("Email verified successfully!!")
    } catch (error) {
        console.log(error)
    }

}


    //auto submit when alll digits are field
    useEffect(()=>{
        if(code.every(digit=>digit!=='')){
            handleSubmit(new Event('submit'));
        }
    },[code])





  return (
    <div
    className="max-w-md w-full bg-green-600 bg-opacity-80 
    backdrop-filter-blur-xl rounded-xl shadow-xl overflow-hidden">
   
   <motion.div
    initial={{opacity:0,y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.5}}
   
   >
    <h2 className='text-2xl font-bold mb-4 text-center bg-gradient-to-r from-pink-600 to-pink-500 text-transparent bg-clip-text'>Verify your Email</h2>
  <p className='text-center text-gray-800 mb-6'>Enter the 6-digit code sent to your email.</p>
  <form onSubmit={handleSubmit}
  className='space-y-6'>
    <div className='flex justify-between '  >
        {
            code.map((digit,index)=>(
                <input
                key={index}
                ref={(el)=>(inputRef.current[index]=el)}
                type='text'
                maxLength='6'
                value={digit}
                onChange={(e)=>handleChange(index,e.target.value)}
                onKeyDown={(e)=>handleKeyDown(index,e)}
                className='w-10 h-10 text-center rounded-md font-bold text-xl bg-gray-700 text-white focus:border-2 mr-2 ml-2 border-gray-rounded-lg focus:border-pink-500 focus:outline-none'
                />
        ))
        }

    </div>
    {error && <p className='text-sm font-semibold text-red-600 mt-2'>{error}</p>}

        <motion.button
              whileHover={{scale:1.02}}
              whileTap={{scale:.96}}
              className="mt-12 w-full py-1 bg-gradient-to-r from-pink-500 to-pink-700 text-white
               font-bold text-2xl  rounded-lg shadow-lg hover:from-pink-600 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:offset-2
               focus:ring-offset-gray-500 transition duration-200"
              type="submit"

              disabled={isLoading || code.some((digit)=>!digit)}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </motion.button>

  </form>
   </motion.div>

    </div>


       
    
  )
}

export default VerifyEmail