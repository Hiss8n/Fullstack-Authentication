require("dotenv").config();
const express=require("express");
const cookieParser=require("cookie-parser");
const connectToDb=require("./Db/connectDb")
const cors=require("cors")
const router=require("./Routes/user_Routes.js")
const path=require("path")

const PORT=process.env.PORT || 3000;
const app=express();
const _dirname=path.resolve();




app.use(cors({
  origin: 'http://localhost:5173', // or use '*' to allow all origins
  credentials: true 
}));
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',router)
if(process.env.NODE_ENV==="production"){

  app.use(express.static(path.join(_dirname,"/frontend/dist")));

  app.get("/*\w",(req,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
  })

}

app.listen(PORT,
    connectToDb(),
    ()=>console.log(`App is now running at port ${PORT}`))