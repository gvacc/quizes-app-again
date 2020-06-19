import React from 'react'
import {withRouter} from 'react-router-dom'
import Button from '../UI/Button/Button'

import classes from './FinishedQuiz.module.css'

const finishedQuiz = props => {
	const rightAnswersCount = () => {
		return Object.keys(props.results).reduce((acc, key) => {
			 if(props.results[key] === 'success'){
			 	return acc + 1
			 } 
			 return acc
		}, 0)
	}

	const renderAnswers = () => {
		return props.quiz.map((quiz, index) => {
			return (
				<li key={index}>
					<i className={props.results[quiz.id] === `success` ? `icon-ok ${classes.success}` : `icon-cancel ${classes.error}`}/>{quiz.question}
				</li>
			)
		})
	}

	const findPercentAnswers = () => {
		return Math.round(rightAnswersCount() * 100 /  props.answerCounts)
	}

	const goToQuizesList = () => {
		props.history.push({
			pathname: '/'
		})
	}

	return(
		<div className={classes.FinishedQuiz}>
			<div className={classes.FinishedQuizHeader}>
				<div>
					<h2>Ты закончил!</h2>
					<h3>Ты ответил на {rightAnswersCount()} из {props.answerCounts} <b>Это -  {findPercentAnswers()}% </b></h3>
				</div>
			</div>
			<div>
				<ul>
					{renderAnswers()}
				</ul>
			</div>
			<Button theme='success' onClick={props.retryHandler}>Пройти еще раз!</Button>
			<Button theme='classic' onClick={goToQuizesList}>К списку тестов</Button>
		</div>
	)
}

export default withRouter(finishedQuiz)