import React, { useState, useEffect, useLayoutEffect } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { List } from '../../cmps/List/List'
import { Filter } from '../../cmps/Filter/Filter'
import { loadItems, removeItem, setFilter } from '../../actions/itemActions'
import { setUser, saveUser } from '../../actions/userActions'
import './Main.scss'
//services
import utilService from '../../services/utilService'
function _Main(props) {

    const [state, setState] = useState({ subcategory: '' })
    useEffect(() => {
        const { subcategory } = props.match.params
        setState({ subcategory })
        return () => {
            props.setFilter(null)
        }
    }, [props.match.params])





   
    async function toggleLike(ev, liked, item) {
        ev.preventDefault()
        if (!props.user) {
            utilService.swal('center', 2500, 'error', 'Please login')
            return
        }
        if (liked) {
            const index = props.user.favs.findIndex(i => i._id === item._id)
            props.user.favs.splice(index, 1)
        } else {
            props.user.favs.push(item)
        }
        await props.saveUser(props.user)
        await props.setUser()
    }

    async function removeItem(id) {
        await props.removeItem(id)
    }

    function setFilter(ev, filterBy) {
        if (ev) {
            ev.preventDefault()
        }
        props.setFilter(filterBy)
        props.loadItems()
    }



    let { items, user } = props
    const { subcategory } = state
    return (
        <main >
            <Filter subcategory={subcategory} setFilter={setFilter}></Filter>
            { items && <List items={items} toggleLike={toggleLike} removeItem={removeItem} ></List>}
            { user && user.isAdmin && < Link className="app-btn" to="/item/edit" replace={true}  >   Add Item</Link>}
        </main>

    )
}


function mapStateProps(state) {

    return {
        items: state.itemReducer.items,
        filterBy: state.itemReducer.filterBy,
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    loadItems,
    setFilter,
    removeItem,
    setUser,
    saveUser
}
export const Main = connect(mapStateProps, mapDispatchToProps)(_Main)