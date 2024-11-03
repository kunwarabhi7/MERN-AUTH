import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/user.model.js';

const protectedRoute = expressAsyncHandler(async (req, res, next) => {
    let token ;
    token = req.cookies.jwt;
    if(token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.userId).select('-password');
        next();
        } catch (error) {
            console.error('Token verification failed', error);
            res.status(403)
            throw new Error('Not authorized, token failed');
        }
    }else{
        res.status(401)
        throw new Error('Not authorized,no token, please login');
    }
});

export {protectedRoute};