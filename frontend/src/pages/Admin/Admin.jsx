import React, { useState, useEffect } from 'react'
import { setUser, saveUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import utilService from '../../services/utilService';
import userService from '../../services/userService'
import './Admin.scss'
export function _Admin(props) {

    const [msg, setMsg] = useState({ text: '', title: '' })

    useEffect(() => {
        if (!props.user || !props.user.isAdmin) {
            props.history.push('/')
        }
    }, [props.user])


    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setMsg(msg => ({ ...msg, [field]: value }))
    }



    function sendMails() {
        userService.sendMails(msg) 
        utilService.swal('center',2500,'success','Mail sent')
        setMsg({ text: '', title: '' })
    }

    return (
        <div>
            <div className="msg flex column">
            <h1> This is Admin page</h1>
                <p>
                    ציון הדף הזה הוא בשביל שתוכל לשלוח מייל לכל המשתמשים שנרשמו והסכימו שתשלח להם אימייל אתה צריך לרשום נושא של האימייל תוכן ולשלוח בכפתור 
                </p>
                <input type="text" placeholder="נושא לאימייל" name="title" value={msg.title} onChange={handleChange} />
                <textarea placeholder="תוכן לאימייל" value={msg.text} name="text" cols="30" rows="10" onChange={handleChange} ></textarea>
            <button className="app-btn" onClick={() => sendMails()}>שלח לכולם</button>
            <h3>you can't write numvers or the mail will sent wrong</h3>
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
    setUser,
}

export const Admin = connect(mapStateProps, mapDispatchToProps)(_Admin)
