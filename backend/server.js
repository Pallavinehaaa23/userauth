const express=require("express");
const app =express();
const PORT = process.env.PORT||8000;
const dotenv= require("dotenv");
const connectDB =require("./config/db")
const userroutes =require("./routes/userroute")

dotenv.config();
connectDB();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hlo");
})
app.use("/api/users",userroutes);
app.listen(PORT,function(){
    console.log(`succedd at ${PORT} `);
})