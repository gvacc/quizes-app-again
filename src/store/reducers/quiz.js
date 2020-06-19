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
} from '../actions/actionTypes'

const initialState = {
	quizesList: null,
	isLoading: false,
	error: null,
	currentQuestion: 0,
	clickedAnswer: null,
	results: {},
	isFinished: false,
	quiz: null
}

export default function quizReducer(state = initialState, action) {

	switch(action.type) {
		case FETCH_QUIZES_START:
			return {
				...state, loading: true
			}
		
		case FETCH_QUIZES_SUCCESS:
			return {
				...state, loading: false, quizesList: action.quizesList
			}
		
		case FETCH_QUIZES_ERROR:
			return {
				...state, loading: false, error:action.error
			}

		case FETCH_QUIZ_SUCCESS:
			return {
				...state, isLoading: false, quiz: action.quiz
			}

		case FETCH_QUIZES_EMPTY: 
			return {
				...state, quizesList: []
			}

		case QUIZ_ZET_STATE:
			return {
				...state, 
				clickedAnswer: action.clickedAnswer,
				results: action.results
			}

		case FINISH_QUIZ:
			return {
				...state, isFinished: true
			}
		
		case QUIZ_NEXT_QUESTION:
			return {
				...state, clickedAnswer: null, currentQuestion: action.number
			}

		case QUIZ_RETRY:
			return {
				...state, 
				results: {},
				isFinished: false,
				currentQuestion: 0,
				clickedAnswer: null
			}

		default: 
			return state
	}

}