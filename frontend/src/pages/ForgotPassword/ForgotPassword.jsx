import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import userService from '../../services/userService'
//imgs
import hidePassword from '../../assets/img/hide-password2.png'
import showPassword from '../../assets/img/show-password.png'
//services
import utilService from '../../services/utilService';


import './ForgotPassword.scss'
export function _ForgotPassword(props) {

    const history = useHistory();


    const [state, setState] = useState(
        {
            inputType: 'password',
            togglePassword: showPassword,
            email: '',
            user: {
                id: null,
                newPass: '',
                confirmNewPass: ''
            }
        })

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        if (field === 'email') {
            setState(state => ({ ...state, email: value }))
        } else {
            setState(state => ({ ...state, user: { ...state.user, [field]: value } }))

        }
    }

    function forgotPassword() {
        userService.forgotPassword(state.email)
        utilService.swal('center',2500,'success','Email sent')
    }


    function savePassword(ev) {
        ev.preventDefault()
        const isPasswordValid = validatePassword(state.user.newPass)
        if (!isPasswordValid) {
            utilService.swal('center',2500,'error','Password to weak')

            return
        }
        if (state.user.newPass !== state.user.confirmNewPass) {
            utilService.swal('center',2500,'error','Password dont match')
            return
        }
        userService.savePassword(state.user)
        utilService.swal('center',2500,'success','Password Changed')

        history.push('/login')


    }

    function validatePassword(password) {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        return strongRegex.test(password)
    }



    function toggleShowPassword(ev) {
        ev.preventDefault()
        if (state.inputType === 'password') {
            setState(state => ({ ...state, inputType: 'text', togglePassword: hidePassword }))
        }
        else {
            setState(state => ({ ...state, inputType: 'password', togglePassword: showPassword }))
        }
    }




    useEffect(() => {

        if (props.user) history.push('/')
        const { token } = props.match.params
        if (token) {
            (async () => {
                const id = await userService.getUserIdByToken(token)
                setState(state => ({ ...state, user: { ...state.user, id } }))

            })()
        } else {
        }
    }, [])


    return (
        <div className="forgot-password">
            {state.user.id &&
                <form className="flex column after-confirm">
                    <div className="new-pass flex column">
                        <label >New Password:</label>
                        <input className="app-input" type={state.inputType} name="newPass" value={state.user.newPass} onChange={handleChange} />

                    </div>
                    <label >Confirm New Password:</label>
                    <div className="confirm-new-pass flex ">
                        <input className="app-input" type={state.inputType} name="confirmNewPass" value={state.user.confirmNewPass} onChange={handleChange} />
                        <img className="img-togglePassword" onClick={(ev) => toggleShowPassword(ev)} src={state.togglePassword} />

                    </div>
                    <button className="app-btn" onClick={(ev) => savePassword(ev)}>save password</button>
                </form>}
            {!state.user.id &&
                <div className="flex column before-confirm">
                    <div className="email flex column">
                        <label >Email:</label>
                        <input className="app-input" type="email" name="email" value={state.email} onChange={handleChange} />
                    </div>
                    <button className="app-btn" onClick={() => forgotPassword()}>Confirm</button>
                </div>
            }
        </div>
    )
}



function mapStateProps(state) {
    return {
        user: state.userReducer.user
    }
}
const mapDispatchToProps = {

}
export const ForgotPassword = connect(mapStateProps, mapDispatchToProps)(_ForgotPassword)
