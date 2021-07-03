import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';

import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';

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
        <div className="bg-light" style={{height: '100vh'}}>
          <div className="container">
            {isAuthenticated && <Navigation />}
            <Switch>
              <Route exact path="/" component={()=>isAuthenticated? <Dashboard/> : <Authentication/>} />
              
            </Switch>
          </div>
        </div>
    </Router>
    )
  }
}

export default withCookies(App) 
