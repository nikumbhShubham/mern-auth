import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
export const signup = async (request, response) => {
    const { username, email, password } = request.body
    const hashpassword=bcryptjs.hashSync(password,10)
    const newUser = new User({ username, email, password:hashpassword })
    try {
        await newUser.save()
        response.status(200).send("user created successfully!!")
    } catch (error) {
        response.status(500).json(error.message)
    }

}