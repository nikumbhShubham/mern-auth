import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
export const signup = async (request, response,next) => {
    const { username, email, password } = request.body
    const hashpassword=bcryptjs.hashSync(password,10)
    const newUser = new User({ username, email, password:hashpassword })
    try {
        await newUser.save()
        response.status(200).json({'msg':'"user created successfully!!"'}).send("added successfully")
    } catch (error) {
        // next(errorHandler(300,"something went wrong!!"))
        next(error)
    }

}