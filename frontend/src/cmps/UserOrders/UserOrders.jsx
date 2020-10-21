import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'

import './UserOrders.scss'
//cmps
import { List } from '../../cmps/List/List'

export default function UserOrders(props) {
    const { user, toggleLike, clearOrders } = props

    const history = useHistory();

    function goShop() {
        history.push('/shop')
    }



    return (
        <section className="flex user-orders">
            {!user.orders.length &&
                <div className="no-orders">
                    <h1>you don't have orders yet</h1>
                    <h3> when you buy items the order's deatils will appear here </h3>
                    <button className="app-btn" onClick={() => goShop()}>go shop</button>
                </div>}
            <div className="orders-list">
                {user.orders.map(order => {
                    console.log(order.id);
                    return <div className="order" key={order.id}>
                        <img src={order.items[0].imgUrls[0]} alt="" />
                        <div className="flex column">
                            <div className="order-details">
                                <p>create at: {order.createdAt}</p>
                                <p className="text-he">{order.id} <label htmlFor="">:מספר הזמנה</label></p>
                                <p>Items: {order.items.length}</p>
                                <p>Total: {order.totalPrice}</p>
                                <Link to={`/order/${order.id}`}>פירוט הזמנה</Link>
                            </div>
                        </div>
                    </div>
                })}
            </div>

        </section>
    )
}
