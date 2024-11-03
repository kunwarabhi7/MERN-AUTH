import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import {generateToken} from '../utils/generateToken.js'
//@desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const loginControllers =expressAsyncHandler( async (req,res)=>{
const {email,password} = req.body;

//check if email and password are provided
if(!email ||!password){
    res.status(400)
    throw new Error('All fields are required');
}

//check if user exists
const user = await User.findOne({email});



if(user && (await user.matchPassword(password))){
   generateToken(res,user._id),
   res.status(200).json({
    _id:user._id,
    name:user.name,
    email:user.email,
   
})
}
else{
res.status(401)
throw new Error('Invalid email or password');

}
//check if password is correct

});

// @desc    register user 
// @route   POST /api/users
// @access  Public

const registerControllers = expressAsyncHandler( async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name ||!email ||!password){
        res.status(400)
        throw new Error('All fields are required');
    }

    //check if user already exists
const userExists = await User.findOne({email});
if(userExists){
    res.status(400)
    throw new Error('User already exists');
}

//create new user
const userCreate = new User({name,email,password});
//save user
const userCreated = await userCreate.save();
if(!userCreated){
    res.status(400)
    throw new Error('Failed to register user');
}
// generate token
generateToken(res,userCreated._id);
//User Created Successfully
res.status(201).json({
    _id:userCreated._id,
    name:userCreated.name,
    email:userCreated.email,
    message: 'User registered successfully'
})

});

// @desc    register user  //clear cookie
// @route   POST /api/users/logout
// @access  Public

const logOutControllers = expressAsyncHandler( async (req,res)=>{
    res.clearCookie('jwt',{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensures secure in production
        sameSite: "Strict", // Helps prevent CSRF attacks
    });
    res.status(200).json({message: 'User logged out successfully'});
});

// @desc    get user 
// @route   get /api/users
// @access  Private

const getUserProfile = expressAsyncHandler( async (req,res)=>{
    res.status(200).json({message: 'Get USer controller'});
});

// @desc    get user 
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = expressAsyncHandler( async (req,res)=>{
    res.status(200).json({message: 'Update USer controller'});
});



export {
    loginControllers,registerControllers,logOutControllers,getUserProfile,updateUserProfile
}