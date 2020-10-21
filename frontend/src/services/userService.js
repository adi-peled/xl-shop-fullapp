import httpService from './httpService'

export default {
    getUser,
    signup,
    login,
    logout,
    updateUser,
    addTocart,
    confirmEmail,
    sendMailToOwner,
    sendMails,
    forgotPassword,
    getUserIdByToken,
    savePassword
}


let loggedinUser = null


async function getUser() {
    return await httpService.get('user/logged')
}

async function getUserIdByToken(token) {
    return await httpService.get(`user/token` + `?token=${token}`)
}

async function savePassword(user) {
    return await httpService.put(`user/savePassword`, user)
}

async function confirmEmail(token, type) {
    return await httpService.put(`user/confirmation/${token}/${type}`)
}

async function sendMailToOwner(userId, orderId) {
    return await httpService.get('user/sendMail' + `?userId=${userId}&orderId=${orderId}`)
}

async function forgotPassword(email) {
    return await httpService.get('user/forgotPassword' + `?email=${email}`)
}


async function sendMails(msg) {
    return await httpService.get('user/sendMails' + `?text=${msg.text}&title=${msg.title}`)
}


async function signup(userCreds) {
    const user = await httpService.post('auth/signup', userCreds)
    return _handleLogin(user)
}

async function logout() {
    await httpService.post('auth/logout');
    sessionStorage.clear();
    loggedinUser = null
}

async function login(userCred) {
    const user = await httpService.post('auth/login', userCred)
    return _handleLogin(user)
}



function _handleLogin(user) {
    sessionStorage.setItem('user', JSON.stringify(user))
    loggedinUser = user
    return user;
}



async function updateUser(user) {
    const updatedUser = await httpService.put(`user/update/${user._id}`, user)
    console.log({ updatedUser });
    return _handleLogin(updatedUser)

}


async function addTocart(item) {
    return await httpService.post(`user/cart/`, item)
}
