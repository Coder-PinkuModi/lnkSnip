import { verifyJWTEmail } from "../service/emailJwtGenerateAndVerification.js";
import usermodel from "../models/usersmodel.js";

async function emailVerificationValidator(req, res) {
  const token = req.params.token;
  console.log(token);
  const userToken = await verifyJWTEmail(token);

  if (!userToken) return res.json({ error: "Invalid Request" });

  const user = await usermodel.findOne({ email: userToken.email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  await usermodel.updateOne(
    { email: userToken.email },
    { $set: { verified: true } }
  );
  await user.save();

  return res.redirect("/login");
}

export { emailVerificationValidator };
