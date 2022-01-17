import React, { Component } from 'react'

import { Bar } from 'react-chartjs-2';

class EntryTotalTracker extends Component {


  getMonthEntries = () => {
  
    const entries = [...this.props.expenses, ...this.props.incomes]
  
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let monthly = {}

    entries.forEach(entry => {
        let d = new Date(entry.datetime)
        let m = `${month[d.getMonth()]}, ${d.getFullYear()}`

        if(!monthly.hasOwnProperty(m)){
          monthly[m] = {"expenses": 0, "incomes":0}
        } 
        
        monthly[m][entry.type]+=entry.amount
    })

    return monthly

  }

    render() {
      const monthly = this.getMonthEntries()
      const months = Object.keys(monthly).sort((a,b) => new Date(a) - new Date(b)).slice(-5)
      const data = {
          labels: months,
          datasets: [
            {
              label: "Expenses",
              data: months.map(m => monthly[m].expenses),
              fill: false,
              backgroundColor: "red",
            
            },
            {
              label: "Incomes",
              data: months.map(m => monthly[m].incomes),
              fill: false,
              backgroundColor: "green",
      
            }
          ]
      };
     
      return (
        <div className="card text-center shadow">

            <div className="card-body">
         
                <Bar data={data} />
            </div>
            
        </div>
        )
    }
}

export default EntryTotalTracker
