import React, { Component } from 'react'
import EntryDisplayTable from '../components/EntryDisplayTable'
import {getExpenses} from "../helpers/utils"
import { Doughnut } from 'react-chartjs-2';

class Expenses extends Component {

    constructor(props){
        super(props)
        this.state = {
            expenses: [],
            chartData: {
                labels: ['Red', 'Blue', 'Yellow'],
                datasets: [
                    {
                    label: '# of Votes',
                    data: [12, 19, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)'
                       
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 1,
                    },
                ],
            }
        }
    }

    async componentDidMount(){
        const expenses = await getExpenses()
        console.log(expenses)
        this.setState({expenses})
    }

    
    render() {
        const {expenses, chartData} = this.state
        return (
            <div>
            
            <div class="row mt-5">
                
                <div class="col-sm-12 col-md-4">
                    <div className="card text-center shadow">
                        <h3 class="card-header">Expenses</h3>
                        <div className="card-body">
                            <Doughnut data={chartData} options={{
                                plugins: {
                                    legend: {
                                    display: false
                                    }
                                }
                            }}/>
                        </div>
                        
                    </div>
                    
                </div>
                <div class="col-sm-12 col-md-8">
            
                    <EntryDisplayTable entries={expenses}/>
                </div>
            </div>
            </div>
        )
    }
}
export default Expenses
