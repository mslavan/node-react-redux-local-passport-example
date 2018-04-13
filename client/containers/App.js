import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Auth from '../modules/Auth';

import SignUpPage from './SignUpPage'
import LoginPage from './LoginPage'
import Home from './Home'
import NotFound from './NotFound'
import Dashboard from './Dashboard'

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)
  
class App extends Component {
  
  render(){
    return( 
      <div>
        <main>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/signup' component={SignUpPage} />
            <Route exact path='/login' component={LoginPage} />
            <Route path='/*' component={NotFound}/>
          </Switch>
        </main>
      </div>
    )    
  }

}

export default App;