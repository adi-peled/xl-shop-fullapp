import React, { useEffect, useState } from 'react'
import { setUser, saveUser } from '../../actions/userActions'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import userService from '../../services/userService'
import Swal from 'sweetalert2'

//svgs
import { ReactComponent as DeleteSvg } from '../../assets/img/delete.svg';
import { ReactComponent as EditSvg } from '../../assets/img/edit.svg';

//services
import utilService from '../../services/utilService';


//cmps
import '../Cart/Cart.scss'

function _Cart(props) {
    const { user } = props

    const history = useHistory();
    const [order, setOrder] = useState({
        id: makeId(),
        createdAt: '',
        items: [],
        totalPrice: 0,
        address: '',
        phoneNumber: ''
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (user) {
            let totalPrice = 0
            user.cart.forEach(item => {
                totalPrice += Number(item.price)
                setOrder(order => ({ ...order, totalPrice }))
            })
            setOrder(order => ({ ...order, items: JSON.parse(JSON.stringify(user.cart)) }))
            setOrder(order => ({ ...order, createdAt: Date.now() }))
        }
    }, [user])

    async function removeFromCart(itemId) {
        const idx = user.cart.findIndex(item => item._id === itemId)
        user.cart.splice(idx, 1)
        await props.saveUser(user)
        await props.setUser()
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        setOrder(order => ({ ...order, [field]: value }))
    }

    async function buyCart() {
        if (!order.address || !order.phoneNumber) {
            utilService.swal('center', 2500, 'error', 'Please add Phone number and Address')

            return
        }
        user.cart = []
        user.orders.unshift(order)
        await props.saveUser(user)
        await props.setUser()
        userService.sendMailToOwner(user._id, order.id)
        const Toast = Swal.mixin({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 4000,
            timerProgressBar: true,
        })
        Toast.fire({
            icon: 'success',
            title: 'Order has been set, soon we will call you in order to finish the Purchase '
        })
    }

    function makeId() {
        return (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    }

    function goShop() {
        history.push('/shop')
    }

    return (
        <div className="flex cart-container">

            {user && !user.cart.length &&
                <div className="empty-cart">
                    <h2>your cart is empty</h2>
                    <h3> when you add item to your cart he will show up here</h3>
                    <button className="app-btn" onClick={() => goShop()}>lets start</button>
                </div>}

            {user &&
                <div className="items-list-cart flex column">
                    {user.cart.map(item => {
                        return <div className="cart-preview-container flex" key={makeId()}>
                            <Link to={`/item/${item._id}`} >
                                <img className="test-img" src={item.imgUrls[0]} />
                            </Link>
                            <div className="item-details-cart flex column">
                                <p>
                                    {item.name}
                                </p>
                                <div className="flex detail">
                                    <label >Color:</label>
                                    <div style={{ backgroundColor: item.color }} className="option " />
                                </div>

                                <div className="flex detail">
                                    <label >Size:</label>

                                    <div className="option flex">
                                        {item.size}
                                    </div>

                                </div>

                            </div>
                            <div className="cancel-edit-cart-item">
                                <DeleteSvg className="delete-svg" onClick={() => removeFromCart(item._id)}></DeleteSvg>
                            </div>
                        </div>
                    })}
                </div>}


            {props.user && <div className="buy-now">
                <h2>
                    Summary
                    </h2>
                <p>
                    {user.cart.length} items
                    </p>
                <div className="address">
                    <label >address</label>
                    <input className="app-input" type="text" name="address" value={order.address} onChange={handleChange} />

                </div>
                <div className="phone">
                    <label >phone number</label>
                    <input className="app-input" type="number" name="phoneNumber" value={order.phoneNumber} onChange={handleChange} />

                </div>
                <p>
                    Total : ${order.totalPrice}
                </p>
                <div>
                    משלוחים לכל הארץ
                    משלוח מסכום של 300 ש"ח חינם
                    דמי משלוח בפחות מ-300 ש"ח יהיו בסך 45 ש"ח
                    החזרת מוצר וביטול עיסקה עד חודש עם הגעה למקום פיזית עם המוצר
                </div>
                <button onClick={buyCart}>  Buy Now </button>
            </div>}

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

export const Cart = connect(mapStateProps, mapDispatchToProps)(_Cart)
