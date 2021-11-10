import React, { Component } from 'react'
import toMaterialStyle from 'material-color-hash';
import { Doughnut } from 'react-chartjs-2';

class EntryChart extends Component {
    
    renderCategories = () => {
        let categories = {}
        this.props.entries.forEach(e => {
            if(categories[e.category_name])
                categories[e.category_name] += e.amount;
            else
                categories[e.category_name] = e.amount;
        });
        return categories
    }
    
    renderData = () => {
        const categories = this.renderCategories()
        return ({
            labels: Object.keys(categories),
            datasets: [
                {
                    label: 'Entry Chart',
                    data: Object.values(categories),
                    backgroundColor: Object.keys(categories).map(c => toMaterialStyle(c).backgroundColor)
                },
            ],
        })
    }

    render() {

        console.log(this.props.entries)
        return (
        <div className="card text-center shadow">
            <h3 class="card-header">Expenses</h3>
            <div className="card-body">
                <Doughnut data={this.renderData} options={{
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
