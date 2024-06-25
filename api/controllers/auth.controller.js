import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js'
import jwt from 'jsonwebtoken'


export const signup = async (request, response, next) => {
    const { username, email, password } = request.body
    const hashpassword = bcryptjs.hashSync(password, 10)
    const newUser = new User({ username, email, password: hashpassword })
    try {
        await newUser.save()
        response.status(200).json({ 'msg': '"user created successfully!!"' }).send("added successfully")
    } catch (error) {
        // next(errorHandler(300,"something went wrong!!"))
        next(error)
    }
}
export const signin = async (request, response, next) => {
    const { email, password } = request.body
    try {
        const validUser = await User.findOne({ email })
        if (!validUser) return next(errorHandler(404, 'User not found'))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'wrong creentials'))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: hashedPassword, ...rest } = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000);
        response.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest)
    } catch (error) {
        next()
    }
}

export const google = async (request, response, next) => {
    try {
        const { email, name, photo } = request.body;
        const user = await User.findOne({ email });
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = user._doc;
            response.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .json(rest);
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = new User({
                username: name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000).toString(),
                email,
                password: hashPassword,
                profilePicture: photo
            });
            await newUser.save();
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
            const { password: hashedPassword, ...rest } = newUser._doc;
            response.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
                .status(200)
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};