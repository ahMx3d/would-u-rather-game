import {
	RECEIVE_QUESTIONS,
	SET_ANSWER,
	SET_NEW_QUESTION,
} from "../constants/questions"

const questions = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_QUESTIONS:
			return {
				...state,
				...action.questions,
			}
		case SET_ANSWER:
			const { authedUser, qid, answer } = action
			return {
				...state,
				[qid] : {
					...state[qid],
					[answer] : {
						...state[qid][answer],
						votes : state[qid][answer].votes.concat([ authedUser ]),
					},
				},
			}
		case SET_NEW_QUESTION:
			return {
				...state,
				[action.question.id]: {
					...action.question,
				},
			}

		default:
			return state
	}
}

export default questions
