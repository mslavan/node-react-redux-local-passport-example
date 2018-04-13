import React, { Component } from 'react'
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

const styles = {

	wrapper: {
		margin: '100px auto',
		padding: 15,
		textAlign: 'center',
		background: '#a8cadf',
	},

	title: { 
		fontSize: 24,
	},
}

const NotFound = () => {
  return (
    <Route render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404;
      }

      return (
		<div style={styles.wrapper}>
			<h2 style={styles.title}>Error 404</h2>
			<h3>Page does not exist</h3>
		</div>
      )
    }}/>
  )
}

export default NotFound;