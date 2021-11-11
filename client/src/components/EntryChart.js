import React, { Component } from 'react'
import toMaterialStyle from 'material-color-hash';
import { Doughnut } from 'react-chartjs-2';

class EntryChart extends Component {
    
    renderData = categories => {
        return ({
            labels: Object.keys(categories),
            datasets: [
                {
                    label: `${this.props.title} chart`,
                    data: Object.values(categories),
                    backgroundColor: Object.keys(categories).map(c => toMaterialStyle(c).backgroundColor)
                },
            ],
        })
    }

    render() {
        let categories = {}
        this.props.entries.forEach(e => {
            if(categories.hasOwnProperty(e.category_name))
                categories[e.category_name] += e.amount;
            else
                categories[e.category_name] = e.amount;
        });
    
        return (
        <div className="card text-center shadow">
            <h3 class="card-header">{this.props.title}</h3>
            <div className="card-body">
                <Doughnut data={this.renderData(categories)} options={{
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }}/>
                <ul class="list-group mt-2 border-0">
                    {
                        Object.entries(categories).map(entry => (
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                {entry[0]}
                                <span class="badge badge-pill" style={{background: toMaterialStyle(entry[0])}}>
                                    ${entry[1]}
                                </span>
                            </li>
                        ))
                    }
                   
                  
                </ul>
            </div>
            
        </div>
        )
    }
}

export default  EntryChart
