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
            <tr>
                <td>
                    <select className="form-control" name="type" aria-label="Default select example" onChange={e => this.handleChange(e)} disabled={!edit}>
                        <option value="" selected={type === ""}  >Type</option>
                        <option value="expenses" selected={type === 'expenses'}>Expense</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" name="category" aria-label="Default select example" onChange={e => this.handleChange(e)} disabled={!edit}>
                        <option value="" selected={category === ""} >Category</option>
                        <option value="food" selected={category === "food"} >Food</option>
                    </select>
                </td>
                <td >
                    <input type="number" className="form-control" onChange={e => this.handleChange(e)} value={amount} min={1}  name="amount" placeholder="Amount" disabled={!edit}/>
                </td>
                <td>
                    <input type="text" className="form-control" onChange={e => this.handleChange(e)} value={description} name="description" placeholder="Description" disabled={!edit}/>
                </td>
                <td>
                    <input type="datetime-local" className="form-control" onChange={e => this.handleChange(e)} value={datetime} name="datetime" placeholder="Date/Time" disabled={!edit}/>
                </td>
                <td col="2">
                    {edit ? (
                        <div class="btn-group" role="group" aria-label="Entry Form Controls">
                         <button class={`btn btn-${id == null ? 'success' : 'info'}`} onClick={() => this.saveEntry()} disabled={isIncomplete} >{id == null ? 'Add' : 'Save'}</button>
                         <button class={`btn btn-danger`} onClick={() => this.clearFields()} disabled={!isFilled} >Clear</button>
                        </div>
                    ) : (
                        <div class="btn-group" role="group" aria-label="Entry Controls">
                            <button type="button" class="btn btn-warning" onClick={() => this.setEditState()}>Edit</button>
                            <button type="button" class="btn btn-danger" onClick={() => this.deleteEntry()}>Delete</button>
                        </div>
                    )}
                   
                </td>
            </tr>
        )
    }
}

export default  Entry