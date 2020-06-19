import axios from 'axios'
import {AUTH_SUCCESS, AUTH_LOGOUT, FETCH_AUTH_ERROR, CLEAR_ERROR} from './actionTypes'

export function auth (email, password, isLogin) {
	return async dispatch => {
		const authData = {
			email, 
			password,
			returnSecureToken: true
		}
			let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCScShCBSVl7EVEHEuHnelOwDIE2jGOZGA'
			
			if(isLogin) {
				url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCScShCBSVl7EVEHEuHnelOwDIE2jGOZGA'
			} 
			try {
				const response = await axios.post(url, authData)
				const data = response.data
				
				const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000) 

				localStorage.setItem('idToken', data.idToken)
				localStorage.setItem('userId', data.localId)
				localStorage.setItem('expirationDate', expirationDate)

				dispatch(authSuccess(data.idToken))
				dispatch(autoLogout(data.expiresIn))

			} catch(e) {
				dispatch(fetchAuthError(e))
			}

	}
}

export function fetchAuthError(error) {
	return {
		type: FETCH_AUTH_ERROR,
		error
	}
}

export function autoLogout(time) {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout())
		}, time * 1000)
	}
}

export function logout() {
	localStorage.removeItem('idToken')
	localStorage.removeItem('userId')
	localStorage.removeItem('expirationDate')
	return {
		type: AUTH_LOGOUT
	}
}

export function clearError() {
	return {
		type: CLEAR_ERROR
	}
}

export function authSuccess(idToken) {
	return {
		type: AUTH_SUCCESS,
		idToken
	}
}

export function autoLogin() {
	return dispatch => {
		const idToken = localStorage.getItem('idToken')
		if(!idToken) {
			dispatch(logout())
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'))
			if(expirationDate <= new Date()) {
				dispatch(logout())
			} else {
				dispatch(authSuccess(idToken))
				dispatch(autoLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
			}
		}
	}
}