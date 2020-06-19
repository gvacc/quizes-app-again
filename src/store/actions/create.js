import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from './actionTypes'
import axios from '../../utils/axios'

export function createQuizQuestion(item) {
	return {
		type: CREATE_QUIZ_QUESTION,
		item
	}
}

export function finishCreateQuiz(title) {
	return async (dispatch, getState) => {
		await axios.post('/quizes.json', {
			title,
			quiz: getState().create.quiz,
		})
		dispatch(resetQuizCreation())
	}
}

export function resetQuizCreation() {
	return {
		type: RESET_QUIZ_CREATION
	}
}