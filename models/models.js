import mongoose from "mongoose"

const shortobjectSchma=new mongoose.Schema({
    shortId:{
        type:String,
    },
    url:{
        type:String,
        required: true
    },
    clicks:{
        type: Number,
        default: 0,
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
},{timestamps:true})

const modelss= mongoose.model("shortURL",shortobjectSchma)
export default modelss