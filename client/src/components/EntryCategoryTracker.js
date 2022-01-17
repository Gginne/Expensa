import React, { Component } from 'react'
import toMaterialStyle from 'material-color-hash';
import { Bar } from 'react-chartjs-2';

class EntryCategoryTracker extends Component {

    constructor(){
        super()
        this.state = {
            type: "expenses"
        }
    }
    getCategoryTotals = type => {
        let categories = {}
        this.props[type].forEach(en => {
            
            if(categories.hasOwnProperty(en.category_name)){
                categories[en.category_name]+=Number(en.amount)
            } else {
                categories[en.category_name] = Number(en.amount)
            }
        });

        return categories
    }

    render() {
        const {type} = this.state
        const categories = this.getCategoryTotals(type)
        const labels = Object.keys(categories)
        const values = Object.values(categories)
        const colors = Object.keys(categories).map(c => toMaterialStyle(c).backgroundColor)
        const options = {
            indexAxis: 'y',
            maintainAspectRatio: false,
        }
        
        const data = {
            labels,
            datasets: [
              {
                label: type,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1,
                hoverBackgroundColor: colors,
                hoverBorderColor: colors,
                data: values
              }
            ]
        }
        return (
            <div className="card text-center shadow" style={{minHeight: "420px"}}>

            <div className="card-body">
                <Bar data={data} options={options}/>
            </div>
            
        </div>
        )
    }
}

export default EntryCategoryTracker