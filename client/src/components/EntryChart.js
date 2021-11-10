import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2';

class EntryChart extends Component {
    toColor = str =>{
        var hash = 5381;
        for (var i = 0; i < str.length; i++) {
          hash = ((hash << 5) + hash) + str.charCodeAt(i); /* hash * 33 + c */
        }
        var r = (hash & 0xFF0000) >> 16;
        var g = (hash & 0x00FF00) >> 8;
        var b = hash & 0x0000FF;
        return "#" + ("0" + r.toString(16)).substr(-2) + ("0" + g.toString(16)).substr(-2) + ("0" + b.toString(16)).substr(-2); 
    }
    
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
                    backgroundColor: Object.keys(categories).map(c => this.toColor(c))
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
