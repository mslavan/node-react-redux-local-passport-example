import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import FormAccount from '../components/FormAccount'

const LoginForm = ({
  onSubmit,
  onChange,
  errors,
  successMessage,
  user,
  toggleAuthenticateStatus
}) => (
  <FormAccount>
    <h2>Log in to account</h2>

    {successMessage && <p className='success'>{successMessage}</p>}
    {errors.summary && <p className='error'>{errors.summary}</p>}   

    <form action='/' onSubmit={onSubmit}>
      <TextField 
        floatingLabelText='email'
        name="email"
        errorText={errors.email}
        onChange={onChange}
        value={user.email} />  
      <TextField 
        type="password"
        floatingLabelText='password'
        name="password"
        errorText={errors.password}
        onChange={onChange}
        value={user.password} />  
      <div>
        <RaisedButton 
          className='margin-small'
          type="submit" 
          label="Log in" 
          primary />
      </div>
      <Link to='/signup'>No account? sign up</Link>
    </form>
  </FormAccount>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
