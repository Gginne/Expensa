const Model = require('./Model')

class Expense extends Model {
    static table = "Expenses"
    static fillable = ['amount', 'description', 'date', 'user_id']
    
    table = "Expenses"
    fillable = ['amount', 'description', 'date', 'user_id']

    constructor(cols){
        super(cols)
    }

}

module.exports = Expense