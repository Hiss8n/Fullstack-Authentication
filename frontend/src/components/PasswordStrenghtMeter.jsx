import { Check, X } from 'lucide-react'
import React from 'react'


    const PasswordCriteria=({password})=>{
        const criteria=[
            {label:"At least 6 characters",met:password.length>=6},
            {label:"Contains uppercase letter",met:/[A-Z]/.test(password)},
            {label:"Contains lowercase letter",met:/[a-z]/.test(password)},
            {label:"Contains a number",met:/\d/.test(password)},
            {label:"At least 6 characters",met:/[^A-Za-z0-9]/.test(password)},
          
        ]
        return(
            <div className='mt-2 space-y-1'>
                {criteria.map((item,index)=>(
                    <div key={index} className='flex items-center text-sm'>
                        {item.met?(
                            <Check className='size-4 text-pink-400 mr-2'/>
                        ):(<X className='size-4 text-gray-800 mr-2'/>

                        )}
                        <span className={item.met? 'text-pink-500':'text-gray-600'}>
                            {item.label}

                        </span>
                    </div>
                ))}

            </div>
        )
    }
 

const PasswordStrenghtMeter=({password})=> {
    const getStrength=(pass)=>{
        let strength=0;
        if(pass.length>=6) strength++;
        if(pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength ++;
        if(pass.match(/\d/)) strength++;
        if(pass.match(/[^a-zA-Z0\d]/)) strength ++
        return strength
    }
    const strength=getStrength(password);
        const getColor=(strength)=>{
        if(strength===0) return"bd-red-500";
        if(strength===1) return"bg-red-400";
        if(strength===2) return"bg-yellow-500";
        if(strength===3) return"bg-yellow-400";
        return "bg-green-500"
      
    }
    const getStrengthText=(strength)=>{
        if(strength===0) return" Very Weak";
        if(strength===1) return"Weak";
        if(strength===2) return"Fair";
        return "Good";
      
    }
  return (
    <div className='mt-2'>
        <div className='flex justify-between items-center mb-1'>
            <span className='text-sm  text-gray-800'>Password Strength</span>

            <span className='text-sm flex justify-end text-pink-500'>{getStrengthText(strength)}</span>

        </div>
        <div className='flex space-x-1'>
            {[...Array(4)].map((__dirname,index)=>(
                <div  key={index}
                className={`h-1 w-1/4 rounded-md transition-color duration-300
                    ${index<strength ? getColor(strength):"bg-gray-600"}
                    `}
                ></div>
            ))}
        </div>
        <PasswordCriteria password={password}/>

    </div>
  )
}



export default PasswordStrenghtMeter
