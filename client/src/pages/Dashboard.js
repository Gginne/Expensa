import React, { Component } from 'react'

import EntryDisplayTable from '../components/EntryDisplayTable'
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
        const entries = [...expenses, ...incomes].filter(entry => {
            let date = new Date(entry.datetime)
            let now = new Date()
            return date.toDateString() === now.toDateString()
        })
        return entries
    }

    delete = async (id) => {
        deleteEntry("expenses",id)
        const expenses = this.state.expenses.filter(exp => exp.id !== id)
        this.setState({expenses})
    }

    render() {
        const recentEntries = this.getRecentEntries()
        return (
            <div class="row">
                <div class="col-sm-12 col-md-8 mt-5">
                    <EntryDisplayTable entries={recentEntries} delete={this.delete} showType/>
                </div>
            </div>
        )
    }
}
export default Dashboard
