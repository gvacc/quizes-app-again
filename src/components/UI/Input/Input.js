import React from 'react'
import classes from './Input.module.css'

const isInvalid = ({isValid, touched, shouldValidate}) => {
	return !isValid && touched && shouldValidate
}

export default props => {
	const cls = [
		classes.Input,
	]

	if(isInvalid(props)) {
		cls.push(classes['error'])
	}

	if(props.className === 'answerStyle') {
		cls.push(classes['answerStyle'])
	}

	const type = props.type || 'text'
	const htmlFor = `${type}${Math.random()}`

	return(
		<div className={cls.join(' ')}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input
				id={htmlFor}
				onChange={props.onChange}
				autoComplete={props.type === 'password' ? 'true' : null}
				value={props.value}
				type={type}
			/>
			{isInvalid(props) ? <span className={classes.errorMessage}>{props.errorMessage}</span> : null}
		</div>
	)
}