require("dotenv").config()

const jwt = require("jsonwebtoken")
const User = require('../models/User')
const AuthController = require("../controllers/auth.controller")

module.exports = async(req, res, next) => {
    const refreshToken = req.cookies['refresh_token']
    
    if(!refreshToken) return res.status(400).json({auth: false, message: "No refresh token"});
  
    try{
        const dRefresh = await jwt.verify(refreshToken, process.env.REFRESH_SECRET)
        if(User.find(dRefresh.id)){
            const {username, email, id} = dRefresh
            req.user = {username, email, id}
            next()
        } else {
            return res.status(400).json({auth: false, message: "User does not exist or was deleted"})
        }
    } catch(e){
        //Refresh token has expired
        return res.status(400).json({auth: false, message: "Refresh token has expired"})
    }

    
}