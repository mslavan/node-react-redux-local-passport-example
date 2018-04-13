import React, { Component } from 'react'
import Paper from 'material-ui/Paper'

const style = {
  maxWidth: 400,
  padding: 10,
  textAlign: 'center',
  position: 'fixed', 
  top: '50%', 
  left: '50%',
  WebkitTransform: 'translate(-50%, -50%)',
  MsTransform: 'translate(-50%, -50%)',
  transform: 'translate(-50%, -50%)'
};

const FormAccount = ({ 
  children 
}) => {
	return (
		<Paper style={style}>
			{children}
		</Paper>
	)
}

export default FormAccount;