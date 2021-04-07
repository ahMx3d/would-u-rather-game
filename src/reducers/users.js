import { RECEIVE_USERS } from "../constants/users"
import { SET_ANSWER, SET_NEW_QUESTION } from "../constants/questions"

const users = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			}
		case SET_ANSWER:
			const { authedUser, qid, answer } = action
			return {
				...state,
				[authedUser] : {
					...state[authedUser],
					answers : {
						...state[authedUser].answers,
						[qid] : answer,
					},
				},
			}
		case SET_NEW_QUESTION:
			return {
				...state,
				[action.question.author]: {
					...state[action.question.author],
					questions : state[action.question.author].questions.concat([
						action.question.id,
					]),
				},
			}

		default:
			return state
	}
}

export default users
