import {
	_getUsers,
	_getQuestions,
	_saveQuestion,
	_saveQuestionAnswer,
} from "./_DATA.js"

export function initialDataGet() {
	return Promise.all([
		_getUsers(),
		_getQuestions(),
	]).then(([ users, questions ]) => ({
		users,
		questions,
	}))
}

export function questionSave(info) {
	return _saveQuestion(info)
}

export function questionAnswerSave(info) {
	return _saveQuestionAnswer(info)
}
