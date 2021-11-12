const Model = require('./Model')

class Income extends Model {
   
    static get table() {
        return "Incomes";
    }

    constructor(cols){
        super(cols)
    }

}

module.exports = Income