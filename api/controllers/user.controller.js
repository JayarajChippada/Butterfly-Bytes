import User from "../models/user.model.js";
import { errorHandler } from "../utils/errorHandler.js";
import bcryptjs from 'bcryptjs';

export const updateUser = async (req, res, next) => {
    if(req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update the user"));
    }
    if(req.body.password) {
        if(req.body.password.length < 6) {
            return next(errorHandler(400, 'Password must be atleast 6 characters'));
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        req.body.password = hashedPassword;
    }
    if(req.body.userName) {
        if(req.body.userName.length < 7 || req.body.userName.length > 20) {
            return next(errorHandler(400, 'Username must be between 7 and 20 characters'))
        }
        if(req.body.userName.includes(' ')) {
            return next(errorHandler(400, 'Username contain spaces'));
        }
        if(req.body.userName !== req.body.userName.toLowerCase()) {
            return next(errorHandler(400, 'Username must be lowercase'))
        }
        if(!req.body.userName.match(/^[a-zA-Z-0-9]+$/)) {
            return next(errorHandler(400, 'Username can only contain letters and numbers'))
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                userName: req.body.userName,
                email: req.body.email,
                profilePicture: req.body.profilePicture,
                password: req.body.password
            }
        }, { new: true });
        const { password: pass, ...userData} = updatedUser._doc;
        res.status(200).json(userData)
    } catch(err) {
        next(err);
    }
}

export const deleteUser = async(req, res, next) => {
    if(req.user.id !== req.params.userId) {
        return next(errorHandler(403, "You are not allowed to update the user"));
    }
    try{
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been deleted!')
    } catch(err) {
        next(err);
    }
}

export const signout = (req, res, next) => {
    try {
        res.clearCookie('access_token')
            .status(200).json('User has been signed out!');
    } catch(error) {
        next(error);
    }
}