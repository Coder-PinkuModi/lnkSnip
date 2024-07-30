import { configDotenv } from "dotenv";
configDotenv();

import jwt from "jsonwebtoken";
const secretKey=process.env.SecretKeyEmailVerify

function generateVerificationEmailToken(email){
    return jwt.sign({
        email:email,
    },secretKey,{ expiresIn: '24h' })
}

async function verifyJWTEmail(token) {
    try {
      const decoded = jwt.verify(token, secretKey);
      return decoded; // Returns decoded payload if valid
    } catch (error) {
      // Handle JWT verification errors (e.g., expired token, invalid signature)
      return null; // Or throw an error depending on your application logic
    }
  }

export { generateVerificationEmailToken , verifyJWTEmail}