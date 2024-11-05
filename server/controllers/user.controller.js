import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import {generateToken} from '../utils/generateToken.js'
//@desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const loginControllers =asyncHandler( async (req,res)=>{
const {email,password} = req.body;

//check if email and password are provided
if(!email ||!password){
    res.status(400)
    throw new Error('All fields are required');
}

//check if user exists
const user = await User.findOne({email});


//verify user and password
if(user && (await user.matchPassword(password))){
  const token = generateToken(res,user._id);
   res.status(200).json({
    _id:user._id,
    name:user.name,
    email:user.email,
   token
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

const registerControllers = asyncHandler( async (req,res)=>{
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

const logOutControllers = asyncHandler( async (req,res)=>{
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

const getUserProfile = asyncHandler( async (req,res)=>{
 const user = {
    _id:req.user._id,
    name:req.user.name,
    email:req.user.email
 }
res.status(200).json(user);

});

// @desc    get user 
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler( async (req,res)=>{
    //check if user exists
 console.log(req.user);
const user = await User.findById(req.user._id);
if(user){
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if(req.body.password){
        user.password=  req.body.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
        _id:updatedUser._id,
        name:updatedUser.name,
        email:updatedUser.email,
        message: 'User profile updated successfully'
    })
}else{
    res.status(404)
    throw new Error('User not found');
}
});



export {
    loginControllers,registerControllers,logOutControllers,getUserProfile,updateUserProfile
}