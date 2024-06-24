import express, { response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoute from './routes/auth.route.js'
import { error } from 'console'
dotenv.config()



mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("connected to MongoDB");
    }).catch((err) => {
        console.log("Error connecting to MongoDB", err);
    })

const app = express()
app.use(express.json())
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoute)

app.use((err, req, res, next) => {   //has to be in correct order ---> (err, req, res, next)
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
    // return res.status(statusCode).json({
    //     success: false,
    //     message,
    //     statusCode
    // })
})

