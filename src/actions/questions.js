import { RECEIVE_QUESTIONS, SET_ANSWER } from "../constants/questions"

export const questionsReceive = (questions) => ({
	type      : RECEIVE_QUESTIONS,
	questions,
})

export const questionAnswerSet = ({ authedUser, qid, answer }) => ({
	type       : SET_ANSWER,
	authedUser,
	qid,
	answer,
})
