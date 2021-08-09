const db = require("../database/db")
const Category = require("../models/Category")
class CategoryController{

    //POST - CRUD ROUTES
    static async index(req, res){ //Get all expense categories
        try{
            const expense = await Category.where(`type='0' AND public='1'`)
            return res.status(200).json({expense})
        } catch(err){
            console.log(err)
            return res.status(400).json({message: 'error'})
        }
    }


}

module.exports = CategoryController