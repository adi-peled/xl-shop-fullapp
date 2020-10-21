import React, { useState } from 'react'
import './InputPassword.scss'
//imgs
import hidePassword from '../../assets/img/hide-password2.png'
import showPassword from '../../assets/img/show-password.png'

export default function InputPassword(props) {

    const [state, setState] = useState({
        inputType: 'password',
        togglePassword: showPassword
    })

    function toggleShowPassword() {
        if (state.inputType === 'password') {
            setState({ inputType: 'text', togglePassword: hidePassword })
        }
        else {
            setState({ inputType: 'password', togglePassword: showPassword })
        }
    }



    return (
        <div className="password">
            <label className="label-password">Password</label>
            <div className="password-container flex">
                <input className="input-password" name="password" value={props.user.password} onChange={(ev) => props.handleChange(ev)} type={state.inputType} />
                <img className="img-togglePassword" onClick={() => toggleShowPassword()} src={state.togglePassword} />
            </div>
        </div>
    )
}
