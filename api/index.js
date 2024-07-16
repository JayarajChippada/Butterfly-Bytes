import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()

import userRoutes from './routes/user.route.js'

const app = express();

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
app.use('/api/user', userRoutes)
