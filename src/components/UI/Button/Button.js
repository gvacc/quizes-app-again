import React from 'react'
import classes from './Button.module.css'

export default props => {
	const typeButton = props.type || 'submit'
	const themeButton = classes[props.theme] || classes.classic

	const cls = [
		classes.Button,
		themeButton
	]
	
	return(
		<button 
			type={typeButton}
			onClick={props.onClick}
			className={cls.join(' ')}
			disabled={props.disabled}
			>{props.children}</button>
	)
}