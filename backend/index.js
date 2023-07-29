const express = require("express")
const dotenv = require("dotenv").config()   //The config() method is a function provided by the dotenv module. It is invoked on the returned object from the require('dotenv') statement
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const usersRoute = require("./routes/users")
const hotelsRoute = require("./routes/hotels")
const roomsRoute = require("./routes/rooms")
const cookieParser = require("cookie-parser")

const app = express();

const connect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to MongoDB")
      } catch (error) {
        throw error;
      }
}

mongoose.connection.on("disconnected",()=>{
    console.log("Mongodb disconnected!")
})
app.get("/",(req,res)=>{
    res.send("Welcome to the Hotel Booking API")
})
//middlewares
app.use(cookieParser())
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

//error handling middleware
app.use((err,req,res,next)=>{
  const errStatus = err.status || 500;
  const errMessage = err.message || "Something went wrong"
  return res.status(errStatus).json({
    success:false,
    status:errStatus,
    message:errMessage,
    stack:err.stack,     //The stack trace of the error, providing additional debugging information
  })
})

app.listen(8800, ()=>{
    connect();
    console.log("connected to Backend")
})