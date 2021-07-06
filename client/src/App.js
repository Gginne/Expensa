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

  handleAuth = token => {
    const {cookies} = this.props
    const user = {token}
    cookies.set('user', user)
    this.setState({isAuthenticated: true})
  }

  handleLogout = () => {
    const {cookies} = this.props
  
    cookies.remove('user')
    this.setState({isAuthenticated: false})
  }


  render() {
    const {isAuthenticated} = this.state
    console.log(isAuthenticated)
    return (
      <Router>
        <div className="bg-light" style={{height: '100vh'}}>
          <div className="container">
            <Switch>
      
              {!isAuthenticated ? (
                <Route path="/" component={props => <Authentication {...props} auth={this.handleAuth}/>} />
              ) : (
                <>
                  <Navigation logout={this.handleLogout}/>
                  <Route exact path="/" component={props => <Dashboard {...props}/>} />
                  <Route exact path="/dashboard" component={props => <Dashboard {...props}/>} />
                </>
              )}
            </Switch>
          </div>
        </div>
    </Router>
    )
  }
}

export default withCookies(App) 
