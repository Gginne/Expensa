const db = require("../database/db")
const Category = require("../models/Category")

class CategoryController{

    //GET - CRUD ROUTES
    static index = async (req, res) => { //Get all public categories
        try{
            const expense = await Category.where(`type='0' AND (public='1' OR user_id='${req.user.id}')`)
            const income = await Category.where(`type='1' AND (public='1' OR user_id='${req.user.id}')`)
            return res.status(200).json({expense, income})
        } catch(err){
            console.log(err)
            return res.status(400).json({message: 'error'})
        }
    }

    static store = async (req, res) => { //Create new category
        const {type, name} = req.body
        const category = new Category({name, type, public: 0, user_id: req.user.id})
        await category.save()
        console.log(type,name)
        return res.status(200).json({message: `category '${name}' added succesfuly`})
        
    }

        

}

module.exports = CategoryController