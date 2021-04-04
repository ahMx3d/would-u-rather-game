import { SET_AUTH_USER, UNSET_AUTH_USER } from "../constants/auth";

export const authUserSet = (id) => ({
    type: SET_AUTH_USER,
    id
})
export const authUserUnset = () => ({
    type: UNSET_AUTH_USER,
})