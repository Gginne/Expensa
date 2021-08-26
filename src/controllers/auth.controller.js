const User = require('../models/User')
const bcrypt = require('bcrypt')
const db = require("../database/db")
const jwt = require("jsonwebtoken")

class AuthController{

    static generateTokens = (user) => {
        const { 
            REFRESH_SECRET, 
            ACCESS_SECRET, 
            REFRESH_EXPIRATION, 
            ACCESS_EXPIRATION 
        } = process.env

        const refreshToken = jwt.sign(user, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRATION+'s' });
        const accessToken = jwt.sign(user,  ACCESS_SECRET, { expiresIn: ACCESS_EXPIRATION+'s' });

        return {refreshToken, accessToken}
    }

    static register = async (req, res) =>{
        //Create new user in database
        let {email, username, password, password2} = req.body

        if(!email || !username || !password || !password2){
            console.log('here')
            return res.status(400).json({message:'Please fill in all the fields'});
        }
        if(password != password2){
            return res.status(400).json({message:'Passwords dont match'});
        }

        const foundEmail = await User.where(`email='${email}'`)
        const foundUsername = await User.where(`username='${username}'`)
        if(foundEmail || foundUsername){
            if(foundEmail) return res.redirect("/") //res.status(400).json({message: "Email already exists"});
            else if(foundUsername) return res.redirect("/") //res.status(400).json({message: "Username already exists"});
        } else {
            try{
                const salt = await bcrypt.genSaltSync(10)
                password = await bcrypt.hash(password, salt);
                const newUser = new User({email, username, password})
                await newUser.save()
                //Send message and authentication key
                const {id} = newUser.cols
                const {refreshToken, accessToken} = this.generateTokens({email, username, id})
                
                res.cookie('refresh_token', refreshToken, {
                    expires: new Date(Date.now() + Number(process.env.REFRESH_EXPIRATION)*1000), 
                    httpOnly: true, secure: true 
                });

                return res.status(200).json({token: accessToken})
            } catch(err){
                console.log(err)
                return res.redirect("/")
                

            }
        }

    }

    static login = async (req, res) => {
        const {emailOrUsername, password} = req.body
        if (emailOrUsername && password) {
            //Get user from model
            const user = await User.where(`email='${emailOrUsername}' OR username='${emailOrUsername}'`)
            const bcryptPassword = bcrypt.compareSync(password, user ? user.cols.password : '');
            //console.log(bcryptPassword)
            if(user && bcryptPassword){
                //Send message and authentication key
                const {email, username, id} = user.cols

                const {refreshToken, accessToken} = this.generateTokens({email, username, id})

                res.cookie('refresh_token', refreshToken, {
                    expires: new Date(Date.now() + Number(process.env.REFRESH_EXPIRATION)*1000), 
                    httpOnly: true, secure: true 
                });

                return res.status(200).json({token: accessToken})
            } else {
                return res.status(400).json({message: 'Invalid Username/email or password'})
            }
        } else {
             return res.status(400).json({message: 'Please enter Username/Email and Password!'});
        }

    }

    static logout(req, res){
        req.session.destroy();
        res.redirect("/auth")
    }


}

module.exports = AuthController