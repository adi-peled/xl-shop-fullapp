import React, { Component } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Link } from "react-router-dom";
import { List } from '../../cmps/List/List'
import { Filter } from '../../cmps/Filter/Filter'
import { loadItems, removeItem } from '../../actions/itemActions'
import { setUser } from '../../actions/userActions'
import './Main.scss'

class _Main extends Component {

    componentDidMount() {
        this.props.loadItems()
        this.props.setUser()
    }

    removeItem = async (id) => {
        await this.props.removeItem(id)
    }

    render() {
        let { items, user } = this.props
        user = JSON.parse(user)
        return (
            <main >
                { user && user.isAdmin && < Link className="btn" to="item/edit" >   Add Item</Link>}
                <Filter></Filter>
                { items && <List items={items} removeItem={this.removeItem} ></List>}
            </main >
        )
    }
}


function mapStateProps(state) {

    return {
        items: state.itemReducer.items,
        // filterBy: state.contactReducer.filterBy,
        user: state.userReducer.user,
    }
}
const mapDispatchToProps = {
    loadItems,
    // setFilter, 
    removeItem,
    setUser

}
export const Main = connect(mapStateProps, mapDispatchToProps)(_Main)