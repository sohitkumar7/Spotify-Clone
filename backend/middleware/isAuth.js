import jwt from "jsonwebtoken";
import { User } from "../models/User.model.js";

export const isAuth = async(req,res,next) => {
    try {
        
        const token = req.cookies.jwt;
        
        if(!token){
            return res.status(401).json({
                error:"no token, unouthorized denied"
            })
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRETE);

        if(!decoded){
            return res.status(401).json({
                error: "Invalid Token"
            })
        }

        const user = await User.findById(decoded.id).select("-password");
        
        if(!user){
            return res.status(401).json({error: "NO USER FOUND"})
        }

        req.user=user;   
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            Error: "internal server error"
        })
    }
} 