import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';

class EntryChart extends Component {
    constructor(props){
        super(props)

        this.state = {
            data: {
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
    render() {
        const {data} = this.state
        return (
        <div className="card text-center shadow">
            <h3 class="card-header">Expenses</h3>
            <div className="card-body">
                <Doughnut data={data} options={{
                    plugins: {
                        legend: {
                        display: false
                        }
                    }
                }}/>
            </div>
            
        </div>
        )
    }
}

export default  EntryChart
