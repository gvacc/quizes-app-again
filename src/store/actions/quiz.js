import {
	FETCH_QUIZES_START, 
	FETCH_QUIZES_SUCCESS, 
	FETCH_QUIZES_ERROR, 
	FETCH_QUIZ_SUCCESS,
	QUIZ_ZET_STATE,
	FINISH_QUIZ,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETRY,
	FETCH_QUIZES_EMPTY
} from './actionTypes'
import axios from '../../utils/axios'

export function fetchQuizes() {
	return async dispatch => {
		dispatch(fetchQuizesStart())
		try {
			const response = await axios.get('/quizes.json')
			if(response.data !== null) {
				const quizesList = []
				Object.keys(response.data).forEach(key => {
					quizesList.push({
						id: key,
						...response.data[key]				
					})
				})
				dispatch(fetchQuizesSuccess(quizesList))
			} else {
				dispatch(fetchQuizesListEmpty())
			}
		}catch(e) {
			dispatch(fetchQuizesError(e))
		}
	}
}

export function fetchQuizById(quizId) {
	return async dispatch => {
		dispatch(fetchQuizesStart())
		try {
			const response = await axios.get(`https://react-quiz-a1a8c.firebaseio.com/quizes/${quizId}/quiz.json`)
			const quiz = response.data
			dispatch(fetchQuizSuccess(quiz))
		}catch(e) {
			dispatch(fetchQuizesError(e))
		}
	}
}

export function fetchQuizesStart() {
	return {
		type: FETCH_QUIZES_START
	}
}

export function fetchQuizSuccess(quiz){
	return {
		type: FETCH_QUIZ_SUCCESS,
		quiz
	}
}

export function fetchQuizesSuccess(quizesList) {
	return {
		type: FETCH_QUIZES_SUCCESS,
		quizesList
	}
}

export function fetchQuizesListEmpty() {
	return {
		type: FETCH_QUIZES_EMPTY
	}
} 

export function fetchQuizesError(error) {
	return {
		type: FETCH_QUIZES_ERROR,
		error
	}
}

export function quizSetState(results, clickedAnswer) {
	return {
		type: QUIZ_ZET_STATE,
		results, clickedAnswer
	}
}

export function finishQuiz() {
	return {
		type: FINISH_QUIZ
	}
}

export function quizNextQuestion(number) {
	return {
		type: QUIZ_NEXT_QUESTION,
		number
	}
}

export function quizAnswerClick(id) {
	return (dispatch, getState) => {
		const state = getState().quiz

		const quiz = state.quiz.concat()
		const currentQuestion = state.currentQuestion
		const rightAnswerId = +quiz[currentQuestion].rightAnswerId

		const results = state.results
		const clickedAnswer = {}
		const currentId = quiz[currentQuestion].id
		
		if(results[currentId] === 'success') {
			return
		}
		
		if(id === rightAnswerId) {
			if(!state.results[currentId]) {
				results[currentId] = 'success'
			}

			clickedAnswer[id] = 'success'
			
			dispatch(quizSetState(results, clickedAnswer))

			if(!isQuizFinished(state)) {
				const timeout = setTimeout(() => {
					dispatch(quizNextQuestion(state.currentQuestion + 1))
					window.clearTimeout(timeout)
			}, 500)	
			} else {
				dispatch(finishQuiz())
			}
			
		} else {
			results[currentId] = 'error'
			clickedAnswer[id] = 'error'
			dispatch(quizSetState(results, clickedAnswer))
		}
	}
}

export function retryQuiz() {
	return {
		type: QUIZ_RETRY
	}
}

function isQuizFinished(state) {
	return state.currentQuestion + 1 === state.quiz.length
}