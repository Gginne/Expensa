import React, { Component } from 'react'

class Entry extends Component {
    static defaultProps = {
        id: null,
        edit: true,
        data: {}
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

    render() {
        const {id, data} = this.state
        const {edit} = this.props
        const {type, category, amount, description, datetime} = data
        return (
            <tr>
                <td>
                    <select className="form-control" name="type" aria-label="Default select example" disabled={!edit}>
                        <option value="expenses" selected >Expense</option>
                    </select>
                </td>
                <td>
                    <select className="form-control" name="category" aria-label="Default select example" disabled={!edit}>
                        <option selected >Category</option>
                    </select>
                </td>
                <td >
                    <input type="number" className="form-control" onChange={e => this.handleChange(e)} value={amount || 0} name="amount" placeholder="Amount" disabled={!edit}/>
                </td>
                <td>
                    <input type="text" className="form-control" onChange={e => this.handleChange(e)} value={description || ''} name="description" placeholder="Description" disabled={!edit}/>
                </td>
                <td>
                    <input type="datetime-local" className="form-control" onChange={e => this.handleChange(e)} value={datetime || ''}name="datetime" placeholder="Date/Time" disabled={!edit}/>
                </td>
                <td>
                    {edit ? (
                         <button class={`btn btn-block btn-${id == null ? 'success' : 'info'}`} onClick={() => this.saveEntry()}>{id == null ? 'Add' : 'Save'}</button>
                    ) : (
                        <div class="btn-group" role="group" aria-label="Entry Controls">
                            <button type="button" class="btn btn-warning" onClick={() => this.setEditState()}>Edit</button>
                            <button type="button" class="btn btn-danger">Delete</button>
                        </div>
                    )}
                   
                </td>
            </tr>
        )
    }
}

export default  Entry