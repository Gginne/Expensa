import React, { Component } from 'react'

class Entry extends Component {
    static defaultProps = {
        id: null,
        edit: true,
        data: {
            type: "",
            category: "",
            amount: 0,
            description: "",
            datetime: ""
        }
    }
    constructor(props){
        super(props)
        this.state = {
            id: this.props.id,
            data: this.props.data,
        }
    }
    handleChange = e => {
        const data = {...this.state.data}
        this.setState({data: {...data, [e.target.name]: e.target.value}})
    }
    saveEntry = e => {
        this.props.save(this.state)
        if(this.state.id === null){
            this.clearFields()
        }
    }
    setEditState = () => {
        this.props.setEdit(this.state.id)
    }
    deleteEntry = () => {
        this.props.delete(this.state.id)
    }
    clearFields = () => {
        this.setState({data: {
            type: "",
            category: "",
            amount: 0,
            description: "",
            datetime: ""
        }})
    }

    render() {
        const {id, data} = this.state
        const {edit} = this.props
        const isIncomplete = Object.keys(data).some(key => !Boolean(data[key]))
        const isFilled = Object.keys(data).some(key => Boolean(data[key]))
        const {type, amount, category, description, datetime} = data
        return (
            <form className="row p-2">
                <div className="col-xs-6 col-sm-4 col-md-2 mt-1">
                    <select className="form-control" name="type" aria-label="Default select example" onChange={e => this.handleChange(e)} disabled={!edit}>
                        <option value="" selected={type === ""}  >Type</option>
                        <option value="expenses" selected={type === 'expenses'}>Expense</option>
                    </select>
                </div>
                <div className="col-xs-6 col-sm-4 col-md-2 mt-1">
                    <select className="form-control" name="category" aria-label="Default select example" onChange={e => this.handleChange(e)} disabled={!edit}>
                        <option value="" selected={category === ""} >Category</option>
                        <option value="food" selected={category === "food"} >Food</option>
                    </select>
                </div>
                <div className="col-xs-6 col-sm-4 col-md-1 mt-1">
                    <input type="number" className="form-control" onChange={e => this.handleChange(e)} value={amount} min={1}  name="amount" placeholder="Amount" disabled={!edit}/>
                </div>
                <div className="col-xs-6 col-sm-5 col-md-2 mt-1">
                    <input type="text" className="form-control" onChange={e => this.handleChange(e)} value={description} name="description" placeholder="Description" disabled={!edit}/>
                </div>
                <div className="col-xs-6 col-sm-7 col-md-3 mt-1">
                    <input type="datetime-local" className="form-control" onChange={e => this.handleChange(e)} value={datetime} name="datetime" placeholder="Date/Time" disabled={!edit}/>
                </div>
                {edit ? (
                    <div class="btn-group col-xs-6 col-sm-12 col-md-1 mt-2" role="group" aria-label="Entry Form Controls">
                        <button class={`btn btn-${id == null ? 'success' : 'info'}`} onClick={() => this.saveEntry()} disabled={isIncomplete} >{id == null ? 'Add' : 'Save'}</button>
                        <button class={`btn btn-danger`} onClick={() => this.clearFields()} disabled={!isFilled} >Clear</button>
                    </div>
                ) : (
                    <div class="btn-group col-xs-6 col-sm-12 col-md-1 mt-2" role="group" aria-label="Entry Edit Controls">
                        <button class="btn btn-warning" onClick={() => this.setEditState()}>Edit</button>
                        <button class="btn btn-danger" onClick={() => this.deleteEntry()}>Delete</button>
                    </div>
                )}
                   
                
            </form>
        )
    }
}

export default  Entry