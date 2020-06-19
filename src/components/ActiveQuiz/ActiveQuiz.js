import React from 'react'
import AnswersList from './AnswersList/AnswersList'

import classes from './ActiveQuiz.module.css'

export default props => (
		<div className={classes.activeQuiz}>
			<h4 className={classes.question}>
				{props.currentQuiz && props.currentQuiz.question}
			</h4>
			<AnswersList clickedAnswer={props.clickedAnswer} onClickAnswer={props.onClickAnswer} answers={props.currentQuiz.answers}/>
		</div>
)
