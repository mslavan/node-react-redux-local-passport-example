import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import FormAccount from '../components/FormAccount'

const SignUpForm = ({
  onSubmit,
  onChange,
  errors,
  user,
}) => (
  <FormAccount>
    <h2>Registration account</h2>

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
          primary
          className='margin-small'
          type="submit" 
          label="Create New Account" />
      </div>
      <Link to='/login'>I already have an account</Link>
    </form>
  </FormAccount>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
