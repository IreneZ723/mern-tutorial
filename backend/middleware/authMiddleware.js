const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer') ){
        try{
            // Get token from head
            // Bearer token
            token = req.headers.authorization.split(' ')[1]
            // verify token
            const decoded = jwt.verify(token,process.env.JWT_SECRET)

            // Get user from the token               // won;t have password
            req.user = await User.findById(decoded.id).select('-password')
            // calling the next piece of middleware
            next()
        }catch(error){
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
        
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})


module.exports = {protect}