import mongoose from "mongoose"

const userModels=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required: true,
    },
},{timestamps:true})

const usermodel= mongoose.model("user",userModels)
export default usermodel;