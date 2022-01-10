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
        
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = e => {
        const {type, name} = this.state

        if(type && name){
            this.props.submit(this.state)
        }
        
        e.preventDefault()
    }
    
    render() {
        const {name, type} = this.state
   
        return (
            <form className="bg-white p-3 shadow-sm" onSubmit={e => this.handleSubmit(e)}>
                <div className="row">
                    <div className="col-2">
                        <select className="form-control" name="type" aria-label="Default select example" onChange={e => this.handleChange(e)}>
                                <option value="" selected={type === ''}>Type</option>
                                <option value="0" selected={type === '0'}>Expenses</option>
                                <option value="1" selected={type === '1'}>Incomes</option>
                        </select>
                    </div>
                    <div className="col-8">
                        <input type="text" className="form-control" onChange={e => this.handleChange(e)} value={name} name="name" placeholder="Description" />
                    </div>
                    <div className="col-2">
                        <button class='btn btn-block btn-primary' disabled={!type || !name}>
                                <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default CategoryForm