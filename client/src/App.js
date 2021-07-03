import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route,Link} from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    const { cookies } = props;
    this.state = {
      isAuthenticated: cookies.get('user') != null
    };
  }


  render() {
    const {isAuthenticated} = this.state
    console.log(isAuthenticated)
    return (
      <Router>
      <div>
        
        <Switch>
        <Route exact path="/" component={()=>isAuthenticated?<Dashboard/> : <Authentication/>} />
        </Switch>
      </div>
    </Router>
    )
  }
}

export default withCookies(App) 
