import React from 'react'
import AnswerItem from './AnswerItem/AnswerItem'

import classes from './AnswersList.module.css'

export default props => {
	const renderAnswers = (answers) => {
		return props.answers.map((answer, value) => {
			return (
				<AnswerItem 
					clickedAnswer={props.clickedAnswer !== null && !!props.clickedAnswer[answer.id] ? props.clickedAnswer[answer.id] : null}
					key={answer.id}
					answer={answer}
					onClickAnswer={props.onClickAnswer}
				/> 
			)
		})
	}
	return(
		<ul className={classes.AnswersList}>
			{renderAnswers(props.answers)}	
		</ul>	
	)
}