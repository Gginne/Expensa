const Model = require('./Model')

class Category extends Model {
   
    static get table() {
        return "Categories";
    }

    constructor(cols){
        super(cols)
    }

}

module.exports = Category