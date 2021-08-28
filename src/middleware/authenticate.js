require("dotenv").config()

const jwt = require("jsonwebtoken")
const User = require('../models/User')
const AuthController = require("../controllers/auth.controller")

module.exports = async(req, res, next) => {
    const accessToken = req.header("x-auth-token")
    const refreshToken = req.cookies['refresh_token']
    
    if(!accessToken || !refreshToken) return res.status(400).json({auth: false, message: "Missing Tokens"});
  
    let dRefresh = null
    try{
        dRefresh = await jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    } catch(e){
        //Refresh token has expired
        return res.status(400).json({auth: false, message: "Refresh token has expired"})
    }

    if(User.find(dRefresh.id)){
        const {username, email, id} = dRefresh

        try{
            const dAccess = await jwt.verify(accessToken, process.env.ACCESS_SECRET)
            if(email === dAccess.email && username === dAccess.username && id === dAccess.id){
                req.user = dRefresh
                next()
            } else {
                //Tokens don't match
                return res.status(400).json({auth: false, message: "Tokens don't match"})
            }
        } catch(e){
            
            return res.status(401).json({auth: false, message: "Access token has expired"})
        }
        
    } else {
        //User does not exist
        return res.status(400).json({auth: false, message: "User does not exist or was deleted"})
    }

    
}