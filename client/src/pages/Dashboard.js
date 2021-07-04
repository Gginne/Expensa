import React, { Component } from 'react'
import {withCookies} from 'react-cookie'

class Dashboard extends Component {
  

    render() {
        const {cookies} = this.props
        console.log(cookies.get('user'))
        return (
            <div>
                <h2>Dashboard</h2>
            </div>
        )
    }
}
export default withCookies(Dashboard)
