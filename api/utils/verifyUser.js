import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js';
export const verifyToken = (request, response, next) => {
    const token = request.cookies.access_token;
    if (!token) return next(errorHandler(401, "Access denied"));


    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, "Token is not valid"))
        request.user = user
        next()
    });


}