import React, {Component} from 'react'

import {connect} from 'react-redux'
import {createControl, validateOfCurrentControl, createAnswerControl, clearControls} from '../../utils/auth'
import {createQuizQuestion,finishCreateQuiz} from '../../store/actions/create'

import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'

import classes from './CreateQuizes.module.css'

class CreateQuizes extends Component {
	state = {
		isFormValid: false,
		rightAnswerId: 1,
		formControls: {
			title: createControl({
				value: '',
				label: 'Заголовок',
				errorMessage: 'Введите корректный заголовок',
				shouldValidate: true
			}, {required: true}),
			question: createControl({
				value: '',
				label: 'Вопрос теста',
				errorMessage: 'Введите корректный вопрос теста',
				shouldValidate: true
			}, {required: true}),
			answer1: createAnswerControl(1),
			answer2: createAnswerControl(2),
			answer3: createAnswerControl(3),
			answer4: createAnswerControl(4)
		},
	}

	onSubmitHandler = evt => {
		evt.preventDefault()
	}

	onChangeHandler = (evt, control) => {
		const formControls = {...this.state.formControls}
		const currentControl = formControls[control]
		const valueOfCurrentControl = evt.target.value
		currentControl.touched = true
		currentControl.value = valueOfCurrentControl
		currentControl.isValid = validateOfCurrentControl(currentControl)
		formControls[control] = currentControl

		let isFormValid = true

		Object.keys(formControls).forEach((ctrl) => {
			isFormValid = formControls[ctrl].isValid === true && isFormValid
		})

		this.setState({
			formControls,
			isFormValid
		})
	}

	createQuiz = () => {
		if(this.state.isFormValid) {
			let formControls = {...this.state.formControls} 
			const {title, answer1, answer2, answer3, answer4, question} = this.state.formControls
			const quizItem = {
				id: this.props.quiz.length + 1,
				rightAnswerId: this.state.rightAnswerId,
				question: question.value,
				answers: [
					{text: answer1.value, id: 1}, 
					{text: answer2.value, id: 2}, 
					{text: answer3.value, id: 3},
					{text: answer4.value, id: 4}
				]
			}
			formControls = clearControls()
			formControls = {title, ...formControls,}
			this.props.createQuizQuestion(quizItem)
			this.setState({
				formControls,
				isFormValid: false
			})
		} else {
			this.touchAllControls()
		}
	}

	sendQuizes =  () => {
		this.setState({
			isFormValid: false,
			rightAnswerId: 1,
		})
		this.props.finishCreateQuiz(this.state.formControls['title'].value)
	}

	touchAllControls = () => {
		const formControls = {...this.state.formControls}
			Object.keys(formControls).forEach((ctrl) => {
				formControls[ctrl].touched = true
			})
		this.setState({
			formControls
		})
	}

	onChangeSelectHandler = evt => {
		this.setState({
			rightAnswerId: evt.target.value
		})
	}

	renderControls = () => {
		return Object.keys(this.state.formControls).map((key, idx) => {
			const control = this.state.formControls[key]
			return (
				<React.Fragment key={idx}>
					<Input 
						value={control.value}
						label={control.label}
						isValid={control.isValid}
						className={control.answerStyle ? 'answerStyle' :  null}
						touched = {control.touched}
						shouldValidate = {control.shouldValidate}
						errorMessage={control.errorMessage}
						onChange = {evt => this.onChangeHandler(evt, key)}
					/>
					{idx === 0 ? <hr style={{maxWidth: '96%'}}/> : null}
				</React.Fragment>
			)
			})
	}

	render() {
		return(
			<form className={classes.CreateQuizes} onSubmit={this.onSubmitHandler}>
				{this.renderControls()}
				<div className={classes.ChooseAnswer}>
				<p className={classes.createdQuizesCount}>{this.props.quiz.length ? `Созданно вопросов - ${this.props.quiz.length}`: null}</p>
				<Select 
					value={this.state.rightAnswerId}
					label='Укажите правильный ответ'
					onChange = {this.onChangeSelectHandler}
					options={[
						{value: 1, text: 'Ответ: 1'},
						{value: 2, text: 'Ответ: 2'},
						{value: 3, text: 'Ответ: 3'},
						{value: 4, text: 'Ответ: 4'}
					]}
				/>
				</div>
				<div className={classes.Buttons}>
					<Button theme='pink' onClick={this.createQuiz} disabled={!this.state.isFormValid}>Создать вопрос</Button>
					<Button theme='success' onClick={this.sendQuizes} disabled={!this.props.quiz.length}>Отправить вопросы</Button>
				</div>
			</form>
		)
	}
}

function mapStateToPros(state) {
	return {
		quiz: state.create.quiz
	}
}

function mapDispatchToProps(dispatch) {
	return {
		createQuizQuestion: item => dispatch(createQuizQuestion(item)),
		finishCreateQuiz: title => dispatch(finishCreateQuiz(title))
	}
}

export default connect(mapStateToPros, mapDispatchToProps)(CreateQuizes);