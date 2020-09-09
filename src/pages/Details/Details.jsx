import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { loadItem, loadItems, saveItem } from '../../actions/itemActions'

import './Details.scss'

class _Details extends Component {

    state = {
        item: null
    }
    async componentDidMount() {
        const { id } = this.props.match.params
        await this.props.loadItem(id)
        await this.props.loadItems()
        this.setState({ item: this.props.item })
    }

    render() {
        const { item } = this.state
        if (!item) return <div>Loading...</div>
        return (
            <section className="item-details">
                <div className="type">
                    <span >type:</span>
                    <span >      {item.type}</span>
                </div>
                <div className="price">
                    <span >price:</span>
                    <span>  {item.price}</span>
                </div>
                <div className="category">
                    <span >category:</span>
                    <span>  {item.category}</span>
                </div>
                <div className="brand">
                    <span >brand:</span>
                    <span>  {item.brand}</span>
                </div>
                <Link  to={`/item/edit/${item._id}`} >Edit </Link>
            </section>
        )
    }
}


function mapStateProps(state) {
    return {
        item: state.itemReducer.currItem
    }
}
// Takes the action dispatchers from the actions file and puts them inside the component's props
const mapDispatchToProps = {
    loadItem,
    loadItems,
    saveItem
}
// Connect is used to tap into the store, without it we have no access to the store from the component
export const Details = connect(mapStateProps, mapDispatchToProps)(_Details)