import mongoose from "mongoose";

async function mongoDBconnect(url){
    return await mongoose.connect(url)
}

export default mongoDBconnect;