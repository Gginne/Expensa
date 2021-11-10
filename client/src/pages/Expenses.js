import React, { Component } from 'react'
import EntryDisplayTable from '../components/EntryDisplayTable'
import EntryChart from '../components/EntryChart'
import {getExpenses, deleteExpense} from "../helpers/utils"


class Expenses extends Component {

    constructor(props){
        super(props)
        this.state = {
            expenses: [],
           
        }
    }

    async componentDidMount(){
        const expenses = await getExpenses()
        console.log(expenses)
        this.setState({expenses})
    }

    deleteEntry = async (id) => {
        deleteExpense(id)
        const expenses = this.state.expenses.filter(exp => exp.id !== id)
        this.setState({expenses})
    }

    
    render() {
        const {expenses} = this.state
        return (
            <div>
            
            <div class="row mt-5">
                
                <div class="col-sm-12 col-md-4">
                   
                    <EntryChart entries={expenses}/>
                </div>
                <div class="col-sm-12 col-md-8">
            
                    <EntryDisplayTable entries={expenses} delete={this.deleteEntry}/>
                </div>
            </div>
            </div>
        )
    }
}
export default Expenses
