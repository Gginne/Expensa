require("dotenv").config()

const jwt = require("jsonwebtoken")
const User = require('../models/User')

module.exports = (req, res, next) => {
    const accessToken = req.header("x-auth-token")
    const refreshToken = req.cookies['refresh_token']
    
    if(!accessToken || !refreshToken) return res.redirect(301, "/")
    
    try{
        const dAccess = jwt.verify(accessToken, process.env.ACCESS_SECRET)
        const dRefresh = jwt.verify(refreshToken, process.env.REFRESH_SECRET)

    
        if(User.find(dRefresh.id)){
            if(JSON.stringify(dAccess) === JSON.stringify(dAccess)){
                req.user = dRefresh
                next()
            } else {
                res.redirect(301, "/")
            }
            
        } else {
            res.redirect(301, "/")
        }

    } catch(e){
        console.log(e)
        res.redirect(301, "/")
    }

    
}