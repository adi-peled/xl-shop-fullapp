import React from 'react'
import { useEffect } from 'react'
import userService from '../../services/userService'
import { useHistory } from 'react-router-dom'
import './ConfirmEmail.scss'

//services
import utilService from '../../services/utilService';

export function ConfirmEmail(props) {

    const history = useHistory();

    useEffect(() => {
        (async () => {
            const { token, type } = props.match.params
            console.log({type});
            if (type === 'forgot') {
                history.push(`/forgotPassword/${token}`)
            } else {
                const id = await userService.confirmEmail(token, type)
                console.log({id});
                if (id) {
                   
                    utilService.swal('center',2500,'success','Email confirmed please log in')

                }
                history.push('/login')
            }
        })()

    }, [])





    return (
        <div>
            <h1>your email confirmed, you can now login </h1>
        </div>
    )
}
