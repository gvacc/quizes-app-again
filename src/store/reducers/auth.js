import {AUTH_SUCCESS, AUTH_LOGOUT, FETCH_AUTH_ERROR, CLEAR_ERROR} from '../actions/actionTypes'
const initialState = {
	idToken: null,
	error: null
}

export default function authReducer(state = initialState, action) {
	switch(action.type) {
		case AUTH_SUCCESS:
			return {
				...state, idToken: action.idToken
			}
		case AUTH_LOGOUT: 
			return {
				...state, idToken: null
			}
		case FETCH_AUTH_ERROR:
			return {
				...state, error: action.error
			} 
		case CLEAR_ERROR:
			return {
				...state, error: null
			}
		default:
			return state
	}
}