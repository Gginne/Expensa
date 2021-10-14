import React, { Component } from 'react'
import EntryDisplayTable from '../components/EntryDisplayTable'
import {getExpenses} from "../helpers/utils"

class Expenses extends Component {

    constructor(props){
        super(props)
        this.state = {
            expenses: []
        }
    }

    async componentDidMount(){
        const expenses = await getExpenses()
        console.log(expenses)
        this.setState({expenses})
    }

    
    render() {
        const {expenses} = this.state
        return (
            <div class="row">
                <div class="col-12 mt-5">
            
                    <h2 class="mb-3">Expenses</h2>
                    <EntryDisplayTable entries={expenses}/>
                </div>
            </div>
        )
    }
}
export default Expenses
