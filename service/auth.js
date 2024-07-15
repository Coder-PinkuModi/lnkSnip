import jwt from "jsonwebtoken";
const secretKey="Pkimoidn@0909$"

function setUser(user){
    return jwt.sign({
        _id:user._id,
        email:user.emailNumber,
    },secretKey)
}

function getUser(token){
    if(!token) return null;
    return jwt.verify(token,secretKey)
}

export {setUser , getUser}