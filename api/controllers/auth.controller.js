import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { createError } from '../middlewares/errorhandling.middleware.js';

export const signup = async(req, res, next) => {
    const { userName, email, password } = req.body;
    try {
        if(!userName || 
            !email || 
            !password || 
            userName ==='' || 
            email ==='' || 
            password ===''
        ) {
            next(createError(400, "All fields are required"));
        }

        // const user = await User.findOne({ $or: [{ userName: userName }, { email: email }] });
        const userWithName = await User.findOne({ userName: userName });
        if(userWithName) {
            next(createError(400, "Username is already exists!"))
        }

        const userWithEmail = await User.findOne({ email: email });
        if(userWithEmail) {
            next(createError(400, "User with Email address is already exists!"))
        }

        const hashedPassword = bcryptjs.hashSync(password, 10);

        const newUser = new User({
            userName,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({ message: "Sign Up Successful!"})

    } catch(err) {
        next(err);
    }
}

export const signin = async(req, res) => {

}