import React, {Component} from 'react'

import {auth} from '../../../store/actions/auth'
import {connect} from 'react-redux'
import {createControl, validateOfCurrentControl} from '../../../utils/auth.js'

import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'

import classes from './Register.module.css'

class Register extends Component {
	state = {
		isFormValid: false,
		formControls: {
			email: createControl({
				value: '',
				errorMessage: 'Введи корректный email',
				label: 'Email',
				type: 'email',
				shouldValidate: true
			}, {
				required: true,
				email: true
			}),
			password: createControl({
				value: '',
				errorMessage: 'Пароль не менее 6 символов',
				label: 'Пароль',
				type: 'password',
				shouldValidate: true
			},{
				required: true,
				minLength: 6
			}),
			passwordRepeat: createControl({
				value: '',
				errorMessage: 'Пароли должны совпадать!',
				label: 'Повторите пароль',
				type: 'password',
				shouldValidate: true
			}, {
				required: true,
				repeat: 'password'
			})
		}
	}

	onChangeHandler = (evt, control) => {
		const formControls = {...this.state.formControls}
		const currentControl = formControls[control]
		const valueOfCurrentControl = evt.target.value
		currentControl.touched = true
		currentControl.value = valueOfCurrentControl
		currentControl.isValid = validateOfCurrentControl(currentControl, formControls[currentControl.validators.repeat])
		formControls[control] = currentControl

		let isFormValid = true

		Object.keys(formControls).forEach((ctrl) => {
			isFormValid = formControls[ctrl].isValid === true && isFormValid
		})

		this.setState({
			formControls,
			isFormValid
		})
	}

	submitHandler = (evt) => {
		evt.preventDefault()
	}

	goToLoginPage = () => {
		this.props.history.push('/auth/login')
	}

	registerHandler = () => {
		if(this.state.isFormValid) {
			this.props.auth(
				this.state.formControls['email'].value,
				this.state.formControls['password'].value,
				false
			)
		} else {
			this.touchAllControls()
		}
	}

	touchAllControls = () => {
		const formControls = {...this.state.formControls}
			Object.keys(formControls).forEach((ctrl) => {
				formControls[ctrl].touched = true
			})
		this.setState({
			formControls
		})
	}

	renderControls = () => {
		return Object.keys(this.state.formControls).map((control, idx) => {
			return(
				<Input
					key={idx}
					value={this.state.formControls[control].value}
					errorMessage={this.state.formControls[control].errorMessage}
					type={this.state.formControls[control].type}
					onChange={evt => this.onChangeHandler(evt, control)}
					shouldValidate={this.state.formControls[control].shouldValidate}
					isValid={this.state.formControls[control].isValid}
					touched={this.state.formControls[control].touched}
					label={this.state.formControls[control].label}
				/>
			)
		})
	}

	render() {
		return(
			<React.Fragment>
				<h1>Зарегестрируйтесь</h1>
				<form className={classes.Register} onSubmit={this.submitHandler}>
					{this.renderControls()}
					<div className={classes.actions}>
					  	<h5 onClick={this.goToLoginPage}>Есть аккаунт ? Войти</h5>
						<Button theme="pink" onClick={this.registerHandler}>Регистрация</Button>
					</div>
				</form>
			</React.Fragment>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return {
		auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)) 
	}
}

export default connect(null, mapDispatchToProps)(Register);