import React, { Component } from 'react'
import EntryDisplayTable from '../components/EntryDisplayTable'
import EntryChart from '../components/EntryChart'
import {getEntries, deleteEntry} from "../helpers/utils"


class Expenses extends Component {

    constructor(props){
        super(props)
        this.state = {
            expenses: [],
           
        }
    }

    async componentDidMount(){
        const expenses = await getEntries("expenses")
        this.setState({expenses})
    }
 
    delete = async (type, id) => {
        deleteEntry(type,id)
        const expenses = this.state.expenses.filter(exp => exp.id !== id)
        this.setState({expenses})
    }

    
    render() {
        const {expenses} = this.state
        return (
            <div>
            
            <div class="row mt-5">
                
                <div class="col-sm-12 col-md-4">
                   
                    <EntryChart title="Expenses" entries={expenses} emptyText="NO EXPENSES"/>
                </div>
                <div class="col-sm-12 col-md-8">
            
                    <EntryDisplayTable entries={expenses} delete={this.delete}/>
                </div>
            </div>
            </div>
        )
    }
}
export default Expenses
