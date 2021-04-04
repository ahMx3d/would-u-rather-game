import { SET_AUTH_USER } from "../constants/auth"

const login = (store) => (next) => (action) => {
    if(action.type === SET_AUTH_USER && !action.id){
        console.error('Are you joking :)')
        return alert('Please select a user to continue');
    }
    return next(action)
}

export default login
