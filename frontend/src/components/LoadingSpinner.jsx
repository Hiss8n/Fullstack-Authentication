import {motion} from "framer-motion"
function LoadingSpinner() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-500 to-white-200 flex items-center justify-center relative overflow-hidden'>
        <motion.div
        className="w-16 h-16 border-t-4 border-t-6 pink-500 border-pink-300 rounded-full"
        animate={{rotate:360}}
        transition={{duration:1,repeat:Infinity,ease:"linear"}}
        >

        </motion.div>

    </div>
  )
}

export default LoadingSpinner