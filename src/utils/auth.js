import {validate as validateEmail} from 'email-validator'

export function createControl(config, validators) {
	return {
		...config,
		isValid: !config.shouldValidate,
		touched: false,
		validators,
	}
}

export function validateOfCurrentControl(control, repeatControl = null) {
		if(!control.shouldValidate) {
			return true
		}

		let isValid = true

		if(control.validators.required) {
			isValid =  control.value !== '' && isValid
		}

		if(control.validators.email) {
			isValid = validateEmail(control.value)
		}

		if(control.validators.minLength) {
			isValid =  control.value.length >= control.validators.minLength && isValid
		}

		if(control.validators.repeat) {
			isValid = control.value === repeatControl.value
		}

		return isValid 
}

export function createAnswerControl(number) {
	 return createControl({
				value: '',
				label: `Ответ ${number}`,
				answerStyle: true,
				errorMessage: 'Введите корректный ответ',
				shouldValidate: true
			}, {required: true})
}

export function clearControls(){
	return {
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
	}
}