import { RECEIVE_USERS } from "../constants/users"

export const usersReceive = (users) => ({
	type  : RECEIVE_USERS,
	users,
})
