import React from 'react'
const Input=({icon:Icon,...props})=> {

  return (
    <div className='relative mb-6 '>
        <div className='absoluet inset-y-0 left-0 flex item-center pl-3 pointer-event-none'>
            <Icon className='size=7 text-pink-600'/>

        <input
        {...props}
        className='w-full pl-8 m-x-5 pr-1 bg-gray-600 bg-opacity-100 rounded-lg border-gray-60
        focus:border-ping-500 focus-ring:pink-600 flex-start text-white placeholder-gray-400 transition-duration-200 '
        />
        
        
        </div>
        
    </div>
  )
}

export default Input