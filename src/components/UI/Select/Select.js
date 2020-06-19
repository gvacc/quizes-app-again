import React from 'react'
import classes from './Select.module.css'

export default props => {
	const htmlFor = `{label${Math.random()}`
	return(
		<div className={classes.Select}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<select id={htmlFor} value={props.rightAnswer} onChange={props.onChange}>
				{props.options.map((option, index) => {
					return <option value={index+ 1} key={index}>{option.text}</option>
				})}
			</select>
		</div>
	)
}