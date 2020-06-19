import React from 'react'
import classes from './AnswerItem.module.css'

export default props => {
	const cls = [
		classes.AnswerItem,
	]
	if(props.clickedAnswer === 'success') {
		cls.push(classes.success)
	} 
	if(props.clickedAnswer === 'error') {
		cls.push(classes.error)
	}
	return(
		<li 
			className={cls.join(' ')}
			onClick={() => props.onClickAnswer(props.answer.id)}
			>
			{props.answer.text}
		</li>
	)
}