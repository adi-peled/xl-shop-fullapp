import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { saveUser, setUser } from '../../actions/userActions'
//cmps
import UserAccount from '../../cmps/UserAccount/UserAccount'
import UserOrders from '../../cmps/UserOrders/UserOrders'
import UserFavs from '../../cmps/UserFavs/UserFavs'
import UserEdit from '../../cmps/UserEdit/UserEdit'
//services
import utilService from '../../services/utilService';

import './Profile.scss'
function _Profile(props) {
    let [state, setState] = useState({ current: 'account', editedUser: null })
    const { user } = props
    const history = useHistory()

    useEffect(() => {
        if (!props.user) {
            history.push('/')
        }
    }, [])

    function setCurrent(current) {
        setState(state => ({ ...state, current }))

    }
    
    useEffect(() => {
        setCurrent(props.match.params.current)
    }, [props.match.params])

    async function saveUser(ev, editedUser, type) {
        setState(state => ({ ...state, editedUser }))

        ev.preventDefault()
        if (type === 'details') {
            props.saveUser(editedUser)

            return
        }
        if (editedUser.newPass && editedUser.currPass && editedUser.newPassConfirm) {
            const isPasswordValid = validatePassword(editedUser.newPass)
            if (!isPasswordValid) {
            utilService.swal('center',2500,'error','Password too weak')

                return
            }
            if (editedUser.newPass !== editedUser.newPassConfirm) {
                utilService.swal('center',2500,'error','Password dont match')

                return
            }
            await props.saveUser(editedUser)
            await props.setUser()
            utilService.swal('center',2500,'success','Password Changed')

            //add here msg that password changed 
            history.push('/')
        }
    }

    function validatePassword(password) {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        return strongRegex.test(password)
    }
    async function toggleLike(ev, liked, item) {
        ev.preventDefault()
        if (!user) return
        if (liked) {
            const index = user.favs.findIndex(i => i._id === item._id)
            user.favs.splice(index, 1)
        } else {
            user.favs.push(item)
        }
        await props.saveUser(user)
        await props.setUser()
    }

    async function clearOrders() {
        user.orders = []
        await props.saveUser(user)
        await props.setUser()
    }

    const { current } = state
    return (
        <div>
            {user && <h2 className="profile-welcome">welcome {user.fname + ' ' + user.lname}</h2>}
            <div className="flex profile">
                <nav className="nav-profile flex">
                    <button className="profile-btn up" onClick={() => setCurrent('account')}>My Account</button>
                    <button className="profile-btn up" onClick={() => setCurrent('edit')}>Edit User</button>
                    <button className="profile-btn" onClick={() => setCurrent('orders')}>My Orders</button>
                    <button className="profile-btn" onClick={() => setCurrent('wishlist')}>My Favorites</button>
                </nav>
                <div className="flex profile-section">
                    {user && current === 'account' && <UserAccount user={user} saveUser={saveUser} />}
                    {user && current === 'edit' && <UserEdit user={user} saveUser={saveUser} />}
                    {user && current === 'orders' && <UserOrders user={user} toggleLike={toggleLike} clearOrders={clearOrders} />}
                    {user && current === 'wishlist' && <UserFavs user={user} toggleLike={toggleLike} />}
                </div>
            </div>
        </div>
    )
}

function mapStateProps(state) {
    return {

        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    saveUser,
    setUser
}
export const Profile = connect(mapStateProps, mapDispatchToProps)(_Profile)
