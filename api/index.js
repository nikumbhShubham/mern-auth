import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import path from 'path'
dotenv.config()



mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log("connected to MongoDB");
    }).catch((err) => {
        console.log("Error connecting to MongoDB", err);
    })

const __dirname=path.resolve();


const app = express()

app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(request,response)=>{
    response.sendFile(path.join(__dirname,'client','dist','index.html'))
});
app.use(express.json())
// app.use(urlencoded({extended:false}))
app.use(cookieParser())

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

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
app.listen(3000, () => {
    console.log("Server is running on port 3000")
})
