import React, { Component } from 'react';
import userService from '../../services/userService'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { setUser } from '../../actions/userActions'
import InputPassword from '../../cmps/InputPassword/InputPassword'
import Swal from 'sweetalert2'

import './Login.scss'
class _Login extends Component {

    state = {
        user: {
            password: '',
            email: ''
        },
    }


    componentDidMount() {
        if (this.props.user) {
            this.props.history.push('/')
        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        this.setState(({ user }) => ({ user: { ...user, [field]: value } }))
    }

    login = async (ev) => {
        ev.preventDefault()
        const user = await userService.login(this.state.user)
        if (typeof (user) !== 'string' && user) {
            this.props.history.push('/')
            this.props.setUser()
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            Toast.fire({
                icon: 'success',
                title: 'Logged In'
            })
        }
        else if (user === 'need active mail before login') {
            const Toast = Swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            })
            Toast.fire({
                icon: 'error',
                title: 'Fail to log in Email need to be confirmed'
            })
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: 'center',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            })
            Toast.fire({
                icon: 'error',
                title: 'Fail to log in Email or Password are wrong'
            })
        }
    }


    render() {
        const { user } = this.state
        return (
            <section className="flex signup-section">
                <form className="flex signup-form" onSubmit={(ev) => this.login(ev)}>
                    <div className="name">
                        <label>Email</label>
                        <input className="signup-form-group" name="email" value={user.email} onChange={this.handleChange} type="email" />
                    </div>
                    <InputPassword handleChange={this.handleChange} user={user} />
                    <a href="/#/forgotPassword">Forgot password?</a>
                    <div className="btns">
                        <button className="signin-button">Login</button>
                    </div>
                    <div className="no-account">
                        <p>Don’t have an account?</p>
                        <Link to="/signup">Sign Up </Link>
                    </div>
                </form>
            </section>
        );
    }
}



function mapStateProps(state) {
    return {
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    setUser
}
export const Login = connect(mapStateProps, mapDispatchToProps)(_Login)