const mongoose=require("mongoose")
// const { use } = require("react")

const userSchema=new mongoose.Schema(
    {
        name:{type:String, required:true},
        password:{type:String, required:true}


    }
)
module.exports=mongoose.model("Anonymous_User",userSchema)