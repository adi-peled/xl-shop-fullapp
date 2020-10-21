import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'

//scss

import './OrderDetails.scss'
function _OrderDetails(props) {
    const { id } = props.match.params
    const [state, setState] = useState(
        {
            order: null,
            date: null,
        })

    useEffect(() => {
        if (props.user) {
            const order = props.user.orders.find(o => o.id === id)
            setState(state => ({ ...state, order }))
            setState(state => ({ ...state, date: new Date(order.createdAt).toLocaleDateString('en-GB') }))
        }
    }, [props.user])

    function makeId() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }



    const { order, date } = state
    return (
        (props.user && order && <div>
            <h2>order time :{date}</h2>

            order id :{order.id}
            {
                order.items.map(item =>
                    <div key={makeId()} className="order-list">
                        <div className="order-preview-container flex">
                            <img src={item.imgUrls[0]} />
                            <div className="order-details">

                                <p>
                                    {item.name}
                                </p>
                                <p>
                                    Color: {item.color}
                                </p>
                                <p>
                                    Size: {item.size}
                                </p>
                                <p>
                                    Price: ${item.price}
                                </p>
                            </div>
                        </div>
                    </div>)
            }
            <p className="total-price">Total Price: ${order.totalPrice}</p>
        </div>)
    )
}


function mapStateProps(state) {
    return {
        item: state.itemReducer.currItem,
        user: state.userReducer.user,
        sameCategoryItems: state.itemReducer.sameCategoryItems
    }
}

const mapDispatchToProps = {

}
export const OrderDetails = connect(mapStateProps, mapDispatchToProps)(_OrderDetails)
