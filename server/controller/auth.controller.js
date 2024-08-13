import { User } from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
export const signup = async (req, res) => {
const {email,name,password}  = req.body;
try {
    if(!email , !name , !password){
        throw new Error("All field are required!")
    }
    const userAlreadyExists = await User.findOne({email});
    if(userAlreadyExists){
        return res.status(400).json({success:false, message:"User already exists"});
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    const user = new User({email,name,password:hashedPassword , verificationToken
    , verificationTokenExpireAt: Date.now() +24 * 60 * 60 * 1000 // 24 hours
    });
    await user.save();
    //jwt token
    generateTokenAndSetCookie(res,user._id);
    res.status(201).json({
        success: true,
        message: "User registered successfully. Please verify your email.",
        user:{
            ...user._doc,
            password: null // remove password from response
        }
    })
        
} catch (error) {
    res.status(400).json({success:false, message:error.message});
}
}

export const login = async (req, res) => {
    res.send('login route');
}

export const logout = async (req, res) => {
    res.send('logout route');
}