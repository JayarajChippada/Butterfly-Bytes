import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
dotenv.config()

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comment.route.js';

const __dirname = path.resolve();
const app = express();

app.use(express.json());
app.use(cookieParser());

mongoose
    .connect(process.env.MONGODB_URL)
    .then(
        () => console.log("Monogdb connection is successful!"))
    .catch(
        (err) => console.log(err)
    )

app.listen(3000, ()=>{
    console.log(`Server is running on Port: ${process.env.PORT}`)
})

//routes
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
})

//middleware
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})
