import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { createError } from '../middlewares/errorhandling.middleware.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { userName, email, password } = req.body;
    try {
        if (!userName || !email || !password || userName === '' || email === '' || password === '') {
            return next(createError(400, "All fields are required"));
        }

        const userWithName = await User.findOne({ userName });
        if (userWithName) {
            return next(createError(400, "Username already exists!"));
        }

        const userWithEmail = await User.findOne({ email });
        if (userWithEmail) {
            return next(createError(400, "User with Email address already exists!"));
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({ message: "Sign Up Successful!" });

    } catch (err) {
        next(err);
    }
};

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === '' || password === '') {
        return next(createError(400, "All fields are required"));
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError(400, "Invalid email or password!"));
        }

        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return next(createError(400, "Invalid email or password!"));
        }

        // Creating a token
        const token = jwt.sign(
            { userId: user._id, userName: user.userName },
            process.env.JWT_TOKEN,
            { expiresIn: '1h' }
        );

        const { password:pass, ...userData } = user._doc;
        res.status(200)
            .cookie('access_token', token, { httpOnly: true })
            .json(userData);
    } catch (error) {
        next(error);
    }
};
