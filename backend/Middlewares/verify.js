import jwt from "jsonwebtoken"
import User from "../Models/users.model.js"
import dotenv from "dotenv"
dotenv.config()
const secret_key=process.env.JWT_SECRET_KEY
const VerifyToken=async (req,res,next)=>{
    try {
        const token=req.headers.authorization.split(' ')[1];
        if(!token)
            return res.status(401).json({msg:"unauthorized user",success:false})
        const decoded=jwt.verify(token,secret_key)
        if(!decoded)
            return res.status(403).json({msg:"token is invalid",success:false})
        const myuser=await User.findById({_id:decoded.id})
        if(!myuser)
            return res.status(404).json({msg:"no user exists",success:false})
        req.user=myuser;
        console.log(req.user)
        next();
    }
    catch(err) {
        return res.status(500).json({msg:"internal server error"+err,success:false})
    }
}
export default VerifyToken