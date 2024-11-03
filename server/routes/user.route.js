import express from 'express';
import { loginControllers ,
    registerControllers,logOutControllers,getUserProfile,updateUserProfile
} from '../controllers/user.controller.js';

const router = express.Router();

router.post("/register", registerControllers)
router.post('/login', loginControllers)
router.post('/logout', logOutControllers)
router.route('/profile').get(getUserProfile).put(updateUserProfile);

export { router as authRouter};