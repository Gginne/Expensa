import React, { Component } from 'react'
import EntryDisplayTable from '../components/EntryDisplayTable'
import EntryTotalTracker from '../components/EntryTotalTracker'
import EntryCategoryTracker from '../components/EntryCategoryTracker'
import {getEntries, deleteEntry} from "../helpers/utils"
class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            expenses: [],
            incomes: []
        }
    }

    async componentDidMount(){
        const expenses = await getEntries("expenses")
        const incomes = await getEntries("incomes")

        this.setState({expenses, incomes})
    }

    getRecentEntries = () => {
        const {expenses, incomes} = this.state
        const entries = [...expenses, ...incomes].sort((a,b) => new Date(b.datetime) - new Date(a.datetime))
        return entries.slice(0,5)
    }


    delete = async (type, id) => {
        deleteEntry(type,id)
        const newEntry = this.state[type].filter(en => en.id !== id)
        this.setState({[type]: newEntry})
    }

    render() {
        const {expenses, incomes} = this.state
        const recentEntries = this.getRecentEntries()
        return (
            <div class="row">
            
                  
                <div class="col-sm-12 col-md-8 my-3">
                    <EntryTotalTracker expenses={expenses} incomes={incomes}/>
                </div>
                <div class="col-sm-12 col-md-4 my-3">
                    <EntryCategoryTracker expenses={expenses} incomes={incomes}/>
                </div>
        
            
                <div class="col-sm-12 col-md-12">
                    <EntryDisplayTable entries={recentEntries} delete={this.delete} emptyText="NO RECENT ENTRIES" showType/>
                </div>
            </div>
        )
    }
}
export default Dashboard
