import userService from "../services/userService"

const _setUser = (user) => ({ type: 'SET_USER', user })

export function setUser() {
    return async dispatch => {
        const user = await userService.getUser()
        dispatch(_setUser(user))
    }
}