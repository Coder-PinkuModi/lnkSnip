import {verifyJWTEmail} from "../service/emailJwtGenerateAndVerification.js"
import usermodel from '../models/usersmodel.js';

async function emailVerificationValidator(req,res){
    const token=req.params.token
    const userToken=verifyJWTEmail(token)

    const user = await usermodel.findOne({email: userToken.email})

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    await usermodel.updateOne(
        { email: userToken.email },
        { $set: { verified: true } }
      );
      await user.save(); 

      req.redirect("/login")

}



export { emailVerificationValidator }