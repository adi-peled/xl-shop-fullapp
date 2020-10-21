import React from 'react'
import { List } from '../../cmps/List/List'
import { useHistory } from 'react-router-dom'
import './UserFavs.scss'
export default function UserFavs(props) {

    const { user, toggleLike } = props
    const history = useHistory();

    function goShop() {
        history.push('/shop')
    }
    return (
        <section className="user-favs">
            {!user.favs.length && <div className="no-favs">
                <h1>  your wishlist still empty</h1>
                <h3>when you press like on item he will be saved here </h3>
                <button className="app-btn" onClick={() => goShop()}>go shop</button>
            </div>}
            <List items={user.favs} toggleLike={toggleLike}  ></List>

        </section>
    )
}
