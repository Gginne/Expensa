import React, { Component } from 'react'

class CategoryForm extends Component {

    
    constructor(props){
        super(props)
        this.state = {
            name: '',
            type: ''
        }
    }

   
    handleChange = e => {
        const data = {...this.state.data}
        this.setState({data: {...data, [e.target.name]: e.target.value}})
    }

    handleSubmit = e => {
        
        console.log('hello')
       
        e.preventDefault()
    }
    
    render() {
        const {name, type} = this.state
   
        return (
            <form className=" bg-white p-3 shadow-sm" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col-2">
                        <select className="form-control" name="type" aria-label="Default select example" onChange={e => this.handleChange(e)}>
                                <option value="" selected={type === ''}>Type</option>
                                <option value="expense" selected={type === 'expense'}>Expense</option>
                                <option value="income" selected={type === 'income'}>Income</option>
                        </select>
                    </div>
                    <div className="col-8">
                        <input type="text" className="form-control" onChange={e => this.handleChange(e)} value={name} name="name" placeholder="Description" />
                    </div>
                    <div className="col-2">
                        <button class='btn btn-block btn-primary' >
                                <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default CategoryForm