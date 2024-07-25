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
    // Check if user is newly created and email verification is not bypassed
  if (this.isNew && !this.verified) {
    // Generate a verification token (you'll need a separate function for this)
    const verificationToken = generateVerificationEmailToken(this.email);
    this.verificationToken = verificationToken;

    // Send email verification email (you'll need a separate function for this)
    await sendVerificationEmail(this.email, verificationToken);
  }
    
    next();
});

const usermodel= mongoose.model("user",userModels)
export default usermodel;