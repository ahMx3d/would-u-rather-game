import { initialDataGet, questionAnswerSave } from "../utils/api"
import { usersReceive } from "../actions/users"
import { questionsReceive, questionAnswerSet } from "../actions/questions"
import { showLoading, hideLoading } from "react-redux-loading"
import { authUserUnset } from "./auth"

export const initialDataHandle = () => (dispatch) => {
	dispatch(showLoading())
	return initialDataGet().then(({ users, questions }) => {
		dispatch(usersReceive(users))
		dispatch(questionsReceive(questions))
		dispatch(hideLoading())
	})
}

export const questionAnswerHandle = (info) => (dispatch) => {
	dispatch(showLoading())
	dispatch(questionAnswerSet(info))
	return questionAnswerSave(info)
		.then(() => {
			dispatch(hideLoading())
		})
		.catch((exception) => {
			dispatch(hideLoading())
			console.error(exception)
			alert("Oops, Error occurred try again")
			// dispatch(questionAnswerUnset)
		})
}

export const authUserLogout = () => (dispatch)=>{
	dispatch(showLoading())
	setTimeout(() => {
		dispatch(hideLoading())
	}, 500);
	dispatch(authUserUnset())
}
