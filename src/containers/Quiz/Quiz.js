import React, {Component} from 'react'
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'
import {connect}  from 'react-redux'

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz.js'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'

import classes from './Quiz.module.css'

class Quiz extends Component {
	componentDidMount = async() => {
		this.props.fetchQuizById(this.props.match.params.id)
	}

	componentWillUnmount() {
		this.props.retryQuiz()
	}

	render(){
		return(
			<React.Fragment>
				{!this.props.isLoading && !this.props.quiz ? <Loader/> :
				<div className={classes.Quiz}>
					<div className={classes.HeaderQuiz}>
						<h2>Ответь на все тесты</h2>
						<p><span>{this.props.currentQuestion + 1}&nbsp;</span>из<span>&nbsp;{this.props.quiz.length}</span></p>
					</div>	
					<div className={classes.BodyQuiz}>
						{ !this.props.isFinished && this.props.quiz.length !== 0
							 ? <ActiveQuiz 
								clickedAnswer={this.props.clickedAnswer} 
								onClickAnswer={this.props.quizAnswerClick} 
								currentQuiz={this.props.quiz[this.props.currentQuestion]}
							/>
							:  <FinishedQuiz
								answerCounts = {this.props.quiz.length}
								quiz={this.props.quiz}
								results={this.props.results}
								retryHandler={this.props.retryQuiz}
							/>
					}
					</div>
				</div>
				}
			</React.Fragment>
		)
	}
}

function mapStateToProps(state) {
	return {
		currentQuestion: state.quiz.currentQuestion,
		clickedAnswer: state.quiz.clickedAnswer,
		results: state.quiz.results,
		isFinished: state.quiz.isFinished,
		quiz: state.quiz.quiz,
		isLoading: state.quiz.isLoading,
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
		quizAnswerClick: id => dispatch(quizAnswerClick(id)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

