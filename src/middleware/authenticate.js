require("dotenv").config()

const jwt = require("jsonwebtoken")
const User = require('../models/User')
const AuthController = require("../controllers/auth.controller")

module.exports = async (req, res, next) => {
    const accessToken = req.header("x-auth-token")
    const refreshToken = req.cookies['refresh_token']

    if(!accessToken || !refreshToken) return res.status(400).json({auth: false, message: "Missing Tokens"});
  
    let dRefresh = null
    try{
        dRefresh = await jwt.verify(refreshToken, process.env.REFRESH_SECRET)
    } catch(e){
        //Refresh token has expired
        return res.status(400).json({refresh: false, message: "Refresh token has expired"})
    }

    const {username, email, id} = dRefresh
    

    if(User.find(id)){
        req.user = {username, email, id}

        try{
            const dAccess = await jwt.verify(accessToken, process.env.ACCESS_SECRET)
            if(email === dAccess.email && username === dAccess.username && id === dAccess.id){
                next()
            } else {
                //Tokens don't match
                return res.status(400).json({refresh: false, message: "Tokens don't match"})
            }
        } catch(e){
        
            const tokens = await AuthController.generateTokens(req, res)
            return res.status(401).json({
                refresh: tokens,
                message: "Access token has expired"
            })
           
            
        }
        
    } else {
        //User does not exist
        return res.status(400).json({refresh: false, message: "User does not exist or was deleted"})
    }

    
}