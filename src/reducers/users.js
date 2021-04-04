import { RECEIVE_USERS } from "../constants/users"
import { SET_ANSWER } from "../constants/questions"

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

		default:
			return state
	}
}

export default users
