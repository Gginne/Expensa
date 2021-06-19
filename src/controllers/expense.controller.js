const Expense = require('../models/User')
const db = require("../database/db")

class ExpenseController{

    //GET - CRUD ROUTES

    static create(req, res){ //Go to expense creation form

    }

    static index(req, res){ //Show all memebers of the model

    }

    static show(req, res){ //Show specific member of the model

    }


    static edit(req, res){ //Go to edit page form

    }

    //POST - CRUD ROUTES
    static async store(req, res){ //Create new expense entry from input data in db

    }

    static async update(req, res){ //Update expense data in db

    }
}

module.exports = ExpenseController
