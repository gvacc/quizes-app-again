import React from 'react'
import classes from './ShowError.module.css'

export default props => {
	const cls = [
		classes.ShowError
	]

	if(props.error) {
		cls.push(classes.open)
	} else {
		cls.push(classes.close)
	}

	return(
		<div className={cls.join(' ')}>
			<span>{props.error ? props.error.message : null}</span>
			<i onClick={props.onClickCloseError} className={'icon-cancel'}/>
		</div>
	)
}