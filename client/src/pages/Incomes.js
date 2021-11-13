import React, { Component } from 'react'
import EntryDisplayTable from '../components/EntryDisplayTable'
import EntryChart from '../components/EntryChart'
import {getEntries, deleteEntry} from "../helpers/utils"


class Incomes extends Component {

    constructor(props){
        super(props)
        this.state = {
            incomes: [],
           
        }
    }

    async componentDidMount(){
        const incomes = await getEntries("incomes")
        console.log(incomes)
        this.setState({incomes})
    }
 
    delete = async (id) => {
        deleteEntry("incomes",id)
        const incomes = this.state.incomes.filter(exp => exp.id !== id)
        this.setState({incomes})
    }

    
    render() {
        const {incomes} = this.state
        return (
            <div>
            
            <div class="row mt-5">
                
                <div class="col-sm-12 col-md-4">
                   
                    <EntryChart title="Incomes" entries={incomes}/>
                </div>
                <div class="col-sm-12 col-md-8">
            
                    <EntryDisplayTable entries={incomes} delete={this.delete}/>
                </div>
            </div>
            </div>
        )
    }
}
export default Incomes
