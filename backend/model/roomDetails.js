const mongoose=require("mongoose") 

const roomDetail=new mongoose.Schema(
    {
        roomName:{type:String, required:true},
        roomDes:{type:String, required:true},
        roomId:{type:Number, required:true},
        password: { type: String, required: false },
    }
)
module.exports=mongoose.model("roomDetails",roomDetail)