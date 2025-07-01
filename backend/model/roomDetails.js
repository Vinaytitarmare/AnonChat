const mongoose=require("mongoose") 

const roomDetails=new mongoose.Schema(
    {
        roomName:{type:String, required:true},
        roomDes:{type:String, required:true},
        roomId:{type:Number, required:true},
    }
)
module.exports=mongoose.model("roomDetails",roomDetails)