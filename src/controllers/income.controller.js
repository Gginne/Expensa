const Income = require('../models/Income')
const Category = require('../models/Category')
const db = require("../database/db")

class IncomeController{

    //GET - CRUD ROUTES

    static index = async (req, res) => { //Show all memebers of the model
        try{
            let incomes = await Income.where(`user_id=${req.user.id}`)
            
            
            for(let i = 0; i < incomes.length; i++){
                let category = await Category.find(incomes[i].cols.category_id)
                incomes[i].cols['category_name'] = category.cols.name
            }
           
            
            return res.status(200).json(incomes)
        } catch(err){
            console.log(err)
            return res.status(400).json({message: 'error'})
        }
    }

    
    //POST - CRUD ROUTES
    static store = async (req, res) => { //Create new expense entry from input data in db
        const {incomes} = req.body
        const resIncomes = []
        incomes.forEach(async (income) => {
            const {amount, description, category_id, datetime} = income
            if(amount && description){
                try{
                    const income = new Income({amount, description, datetime, category_id, user_id: req.user.id})
     
                    resIncomes.push(income.cols)
                    await income.save()
                    return res.status(200).json(resIncomes)
                } catch(err){
                    return res.status(400).json({message: "Error creating income"})
                }
                
            } else {
                return res.status(400).json({message: "Missing required fields"})
            }
        })

        
        
    }

    static async update(req, res){ //Update expense data in db

    }

    static async delete(req, res){ //Update expense data in db
        try{
            let income = await Income.find(req.params.id)
            income.delete()
            
            return res.status(200).json(`Income with id=${req.params.id} was deleted`)
        } catch(err){
            console.log(err)
            return res.status(400).json({message: 'error'})
        }
    }


}

module.exports = IncomeController
