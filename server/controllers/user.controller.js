import expressAsyncHandler from "express-async-handler";

//@desc    Auth user & get token
// @route   POST /api/users/auth
// @access  Public
const loginControllers =( async (req,res)=>{
    res.status(200).json({message: 'Authentication controller'});
});

// @desc    register user 
// @route   POST /api/users
// @access  Public

const registerControllers = expressAsyncHandler( async (req,res)=>{
    res.status(200).json({message: 'Register controller'});
});

// @desc    register user  //clear cookie
// @route   POST /api/users/logout
// @access  Public

const logOutControllers = expressAsyncHandler( async (req,res)=>{
    res.status(200).json({message: 'LogOut controller'});
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