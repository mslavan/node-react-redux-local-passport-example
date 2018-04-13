import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import PropTypes from 'prop-types';

const HeaderBar = ({ 
  user, 
  isLogged,
  onLogout, 
}) => (
  <AppBar
    title={`WORKER EMAIL: ${user.email}`}
    iconElementLeft={<div/>}
    iconElementRight={
    	isLogged 
    	? <FlatButton label="Sign out" onClick={onLogout}/> 
    	: <FlatButton label='Sign in' containerElement={<Link to='/login'/>}/>
    } />
);

HeaderBar.propTypes = {
  user: PropTypes.object.isRequired,
  isLogged: PropTypes.bool.isRequired
};

export default HeaderBar;
