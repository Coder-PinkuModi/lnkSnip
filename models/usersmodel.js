import mongoose from "mongoose"
import { sendVerificationEmail } from "../service/emailVerify.js";
import { generateVerificationEmailToken } from "../service/emailJwtGenerateAndVerification.js"

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
    verified: { type: Boolean, default: false },
},{timestamps:true})

userModels.pre('save', async function(next) {
  if (this.isNew && !this.verified) {

    const verificationToken = generateVerificationEmailToken(this.email);
    this.verificationToken = verificationToken;

    await sendVerificationEmail(this.email, verificationToken);
  }
    
    next();
});

const usermodel= mongoose.model("user",userModels)
export default usermodel;