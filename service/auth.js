import { configDotenv } from "dotenv";
configDotenv();


import jwt from "jsonwebtoken";
const secretKey=process.env.SecretKey

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.email,
    },secretKey)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secretKey)
}

export {setUser , getUser}