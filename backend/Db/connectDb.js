const mongoose= require("mongoose")


 connectToDb=async()=>{
    try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Mongodb connected!!")
        
        
    } catch (error) {
        console.log(error)
        console.log("Can not connected to the database!!")
        
    }
}

module.exports=connectToDb;