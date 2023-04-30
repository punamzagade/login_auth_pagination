const express=require("express");
const app=express();
const mognoose=require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
dotenv.config();
const authRoute=require("./routes/auth");

const cors=require("cors");


app.use(cors({
   credentials: true
}));
 
mognoose.connect(process.env.MONGO_URL)
.then(()=>console.log("connected"))
.catch((err)=>console.log(err));

app.use(express.json()); 
app.use(cookieParser()); 
app.use("/api/auth",authRoute);

app.listen(process.env.PORT || 5000,()=>{
   console.log("listening");
})