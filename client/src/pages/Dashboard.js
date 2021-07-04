import React, { Component } from 'react'
import {withCookies} from 'react-cookie'

class Dashboard extends Component {
  

    render() {
        const {cookies} = this.props
        console.log(cookies.get('user'))
        return (
            <div class="row">
                <div class="col-12 mt-5">
            
                    <h2 class="mb-3">Welcome</h2>

                </div>
            </div>
        )
    }
}
export default withCookies(Dashboard)
