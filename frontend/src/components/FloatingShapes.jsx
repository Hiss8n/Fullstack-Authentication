  import React from 'react'
  import {easeIn, easeInOut, motion} from "framer-motion"
  const FloatingShapes=({color ,ease ,size,left,top,delay,right})=>{
    return (
      <motion.div  className={` absolute rounded-full ${color}  ${size}  opacity-20 blur-xl} `}
      style={{top ,left,right}}
      animate={{
        y:["0%","50%","0%"],
        x:["0%","70%","0%"],
        rotate:[0,360]
      }}
      transition={{
        duration:20,
        ease:'linear',
        repeat:Infinity,
        delay,
        easeIn:easeInOut
      }}
      aria-hidden='true'
      />
    )
  }

  export default FloatingShapes;


  