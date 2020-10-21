import userService from "../services/userService"

const _setUser = (user) => ({ type: 'SET_USER', user })



export function setUser() {
    return async dispatch => {
        const user = await userService.getUser()
        dispatch(_setUser(user))
    }
}


export function saveUser(user) {
    return async dispatch => {
        const updatedUser = await userService.updateUser(user)
        dispatch(_setUser(updatedUser))
    }
}




