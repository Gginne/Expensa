import React, { Component } from 'react'
import EntryTable from '../components/EntryTable'
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import axios from 'axios'

class EntryPage extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    toMYSQLDatetime = d => {
        d = new Date(d)
        return d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
    }

    submitEntries = entries => {
        const {cookies} = this.props;
        const {token} = cookies.get('user')
        entries.forEach(async (entry) => {
            const {type, amount, description, datetime} = entry.data
            try{
                const res = await axios.post("/"+type, {
                    amount: Number(amount), 
                    description, 
                    datetime: this.toMYSQLDatetime(datetime)
                }, {headers: {
                    'x-auth-token': token
                }})
                console.log(res)
            } catch(e){
                console.log(e)
            }
        });
    }

    render() {
        return (
        <div class="row">
            <div class="col-12 mt-5">
        
                <h2 class="mb-3">Add Entries</h2>
                <div className="mt-4">
                    <EntryTable submit={this.submitEntries} />
                </div>
            </div>
        </div>
        )
    }
}

export default withCookies(EntryPage)