const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const User = require("./model/user"); //import model from this
const app=express()
const PORT = process.env.PORT || 5000;
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
const cors = require("cors");
const bodyParser = require("body-parser");  
app.use(cors());
app.use(bodyParser.json());
const roomDetails=require("../backend/model/roomDetails")


// const MONGO_URL="mongodb+srv://anonymous_user:123@cluster0.ryyih.mongodb.net/Anonymous_Chatroom?retryWrites=true&w=majority&appName=Cluster0"
const MONGO_URL=process.env.MONGO_URL
const Secret_Key="vinay_123"
// connct mongoose
mongoose.connect(MONGO_URL)
 .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// login routes
app.post("/api/login", async(req,res)=>{
    const {name,password}=req.body;
    console.log(name,password)
    
    try{
        const user=await User.findOne({name,password})
        console.log(user)
        if(user)
        {   const token=jwt.sign({},Secret_Key,{expiresIn:"2h"});
        console.log(token)
            res.json({ success: true, message: "Login successful",username:name, tokenn:token });
    }
            
        else{
            res.json({ success: false, message: "Login failed" });
        }
    
    }
    catch(e){
         console.error("Login error:", e);
         res.status(500).json({ success: 0, message: "Server error" });

    }
});

// signup
app.post("/api/signup", async(req,res)=>{
    const {name,password}=req.body;
    
    try{
        const isExist=await User.findOne({name,password})
        if(isExist)
        {
           return  res.json({success:false, message:"Already User found"})
        }
        else{
            const newuser=new User({name,password})
            await newuser.save();
            res.json({success:true, message:"signup successful"})
        }
        
    
    }
    catch(e){
        console.error("Signup error:", e); // helpful log
         res.status(500).json({ success: false, message: "Server error" });

    }
});

// room creation page
app.post("/api/createRoom", async(req,res)=>{
    try{
        const {roomName,roomDes,roomId}=req.body;
        const isexist=await roomDetails.findOne({roomId});
        if(isexist)
        {
          return res.json({success:false,message:"Room Id already taken!!"})
        }
    const details=new roomDetails({roomName,roomDes,roomId})
    await details.save();
    res.json({success:true,message:"done"})
    }
    catch(e){
        console.log(e)
        
    }
})
// call all the rooms
app.get("/api/getRooms",async(req,res)=>{
   try{
     const rooms= await roomDetails.find();
    res.json({status:true,message:rooms});
   }
   catch{
    res.json({status:false,message:"Unable to fetch data"})
   }
})

// check if room exist/created
app.get("/api/checkRoom", async(req,res)=>{
  try{
    const{roomId}=req.query;
    const isExist=await roomDetails.findOne({roomId})
    if(isExist)
    {
      res.json({status:true,message:"Room Id verified!!"})
    }
    else{
       res.json({status:false,message:"Room Id not found!!"})
    }

  }
  catch(e){
    console.log("server error",e)
    res.json({status:0, message:"server error"})
  }
})

//   app.listen(PORT, ()=>{
//     console.log("server is running!!")
//   })

  const http=require("http")
  const {Server}=require("socket.io")

  const server=http.createServer(app);
  const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"]
    }
  })
//   io.on("connection", (socket) => {

//   console.log("User connected:", socket.id);

//   // Join room
//   socket.on("join-room", (roomId) => {
//     socket.join(roomId);
//     console.log(`User ${socket.id} joined room ${roomId}`);
//   });

//   // Handle chat message
//   socket.on("send-message", ({ roomId, message, sender }) => {
//     io.to(roomId).emit("receive-message", { message, sender });
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected:", socket.id);
//   });
// });
// Add this to your server
const roomMessages = {}; // Temporary in-memory storage

io.on("connection", (socket) => {
  // Join room and send existing messages
  socket.on("join-room", (roomId) => {
    socket.join(roomId);
    
    // Initialize room if it doesn't exist
    if (!roomMessages[roomId]) {
      roomMessages[roomId] = [];
    }
    
    // Send message history to the new user
    socket.emit("message-history", roomMessages[roomId]);
  });

  // Handle new messages
  socket.on("send-message", ({ roomId, message, sender }) => {
    const msg = { message, sender, timestamp: Date.now() };
    
    // Store message
    roomMessages[roomId].push(msg);
    
    // Broadcast to room
    io.to(roomId).emit("receive-message", msg);
  });
});
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});