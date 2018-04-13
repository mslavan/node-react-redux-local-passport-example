import axios from 'axios';
import jwt_decode from 'jwt-decode';

import Auth from '../../modules/Auth'

export const SET_LOGIN_USER = 'SET_LOGIN_USER',
			 SET_LOGOUT_USER = 'SET_LOGOUT_USER';


export function loginUser(value){
    let savedJwt =  Auth.getToken();

	if (savedJwt !== value) {
        Auth.authenticateUser(value);
    }

	return {
		type: SET_LOGIN_USER ,
		user: jwt_decode(value)
	}

}

export function logoutUser(){
    Auth.deauthenticateUser();

	return {
		type: SET_LOGOUT_USER,
		user: {}
	}

}