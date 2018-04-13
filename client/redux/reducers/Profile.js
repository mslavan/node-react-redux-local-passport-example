import CookieDough from 'cookie-dough';
import jwt_decode from 'jwt-decode';

import Auth from '../../modules/Auth'

const initialState = {
	user : Auth.isUserAuthenticated() ? jwt_decode(Auth.getToken()) : {},
};


export default function profile(state = initialState , action ) {
	switch (action.type) {
		case 'SET_LOGIN_USER' :
		    return { ...state, user: action.user };

		case 'SET_LOGOUT_USER' :
		    return { ...state, user: action.user };

		default:
		return state;
	}
  return state
}
