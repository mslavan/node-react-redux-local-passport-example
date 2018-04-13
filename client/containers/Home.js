import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'


class Home extends Component {

	render() {
        const loggedIn = !_.isEmpty(this.props.profile.user) ? true : false;

	  	return (
			<Route render={ ({ staticContext }) => 
		      loggedIn ? (
			    <Redirect to="/dashboard"/>
			  ) : (
			    <Redirect to="/login"/>
			  )
		    }/>
		)
	}
}


const mapStateToProps = ({ profile }) => ({
  profile,
});

export default connect(mapStateToProps, null)(Home);