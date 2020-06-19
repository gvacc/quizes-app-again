import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../store/actions/quiz'

import Loader from '../../components/UI/Loader/Loader'

import classes from './QuizesList.module.css'

class QuizesList extends Component {
	componentDidMount = () => {
		this.props.fetchQuizes()
	}

	clickCardHandler = (id) => {
		this.props.history.push({
			pathname: `/quiz/${id}`
		})
	}

	renderQuestionsList = () => {
		return this.props.quizesList.map(quize => {
			return (
				<div className={classes.cardQuiz} onClick={() => this.clickCardHandler(quize.id)} key={quize.id}>
						<div className={classes.title}>
							{quize.title}
						</div>
				</div>
			)
		})
	}

	render() {
		return(
			<div className={classes.QuizesList}>
				{!this.props.isLoading && !this.props.quizesList ? <Loader/> : 
					<div className={classes.quizes}>
						{this.props.quizesList.length ? this.renderQuestionsList() : <p>Тестов пока нет, приходите позже =)</p>}
					</div>
				}
			</div>
		)
	}
} 

function mapStateToProps(state) {
	return {
		quizesList: state.quiz.quizesList,
		isLoading: state.quiz.isLoading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizes: () => dispatch(fetchQuizes())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizesList)