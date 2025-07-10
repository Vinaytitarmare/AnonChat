const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
// const path = require('path');
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
const Admin=require("../backend/model/admin")
const Message = require("./model/Message");
const { encrypt, decrypt } = require("./utils/encryption");

// const MONGO_URL="mongodb+srv://anonymous_user:123@cluster0.ryyih.mongodb.net/Anonymous_Chatroom?retryWrites=true&w=majority&appName=Cluster0"
const MONGO_URL=process.env.MONGO_URL
const Secret_Key="vinay_123"
// connct mongoose
mongoose.connect(MONGO_URL)
 .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

const path = require('path');


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

// Admin Login //no signing for admin
app.post("/api/admin_login", async(req,res)=>{
  const {name,password}=req.body;
  console.log(name,password)
  
  try{
    const user=await Admin.findOne({name,password})
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
      const {roomName,roomDes,roomId,password}=req.body;
      const isexist=await roomDetails.findOne({roomId});
      if(isexist)
        {
          return res.json({success:false,message:"Room Id already taken!!"})
        }
        const details=new roomDetails({roomName,roomDes,roomId, password: password || undefined})
        await details.save();
        res.json({success:true,message:"Room Created!"})
      }
      catch(e){
        console.log(e)
        
      }
    })
    
    // handleDelete
    app.delete("/api/delete", async(req,res)=>{
      try{
        const {roomId}=req.query;
        
        const deleteroom=await roomDetails.findOneAndDelete({roomId: (roomId)});
        if(deleteroom) res.json({status:true,message:"Room deleted successfuly!"})
          else{
        res.json({status:false,message:"Unable to delete Room due to internal issue!!"})}
      }
      catch(e){
        console.log(e)
        res.json({status:false,message:"Unable to delete Room due to server issue!!"})
        
        
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
      
      app.get("/api/checkPassword", async(req,res)=>{
        try{
          const{roomId}=req.query;
          const isExist=await roomDetails.findOne({roomId})
          const data=await isExist
          if(
            !data.password)
            {
              return res.json({ispassword:"no"})
            }
            else{
              return res.json({ispassword:"yes",password:data.password})
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
          
          // Serve static files from Vite's dist folder
          app.use(express.static(path.join(__dirname, '../frontend/dist')));
          
          // Serve index.html for any non-API route
          app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
          });
          
          const http=require("http")
          const {Server}=require("socket.io");
          
          const server=http.createServer(app);
          const io=new Server(server,{
            cors:{
              origin:"*",
              methods:["GET","POST"]
            }
          })
 const roomMessages = {}; // Temporary in-memory storage
                  
io.on("connection", (socket) => {

  socket.on("join-room", async (roomId) => {
    socket.join(roomId);

    try {
      const previousMessages = await Message.find({ roomId }).sort({ timestamp: 1 });

      // Decrypt before sending
      const decryptedMessages = previousMessages.map(msg => ({
        message: decrypt(msg.message),
        sender: msg.sender,
        timestamp: msg.timestamp
      }));

      socket.emit("message-history", decryptedMessages);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  });

  socket.on("send-message", async ({ roomId, message, sender }) => {
    const encryptedMessage = encrypt(message);

    const msg = {
      roomId,
      message: encryptedMessage,
      sender,
      timestamp: Date.now()
    };

    // Emit original (not encrypted) to clients
    io.to(roomId).emit("receive-message", {
      message,
      sender,
      timestamp: msg.timestamp
    });

    try {
      const dbMessage = new Message(msg);
      await dbMessage.save();
    } catch (err) {
      console.error("DB save error:", err);
    }
  });

});
server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});