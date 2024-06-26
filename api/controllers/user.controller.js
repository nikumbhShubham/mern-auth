import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'


export const test = (request, response) => {
    response.json({ message: 'API is working!' })
}

export const updateUser = async (request, response, next) => {
    if (request.user.id !== request.params.id) {
        return next(errorHandler(401, "You are not authorized to update this user."));
    }
    try {
        if (request.body.password) {
            request.body.password = bcryptjs.hashSync(password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(request.params.id,
            {
                $set: {
                    username: request.body.username,
                    email: request.body.email,
                    password: request.body.password,
                    profilePicture: request.body.profilePicture
                }
            },
            { new: true }
        )
        const { password, ...rest } = updatedUser._doc

        response
            .status(200)
            .json(rest)

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (request, response, next) => {
    if (request.user.id !== request.params.id) {
        return next(errorHandler(401, "You are not authorized to update this user."));
    }
    try {

         await User.findByIdAndDelete(request.params.id)
        response.status(200).json("User has been deleted")
    } catch (error) {
        next(error)
    }
}

