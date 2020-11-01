import React, { useState, useEffect, createRef } from 'react';
import 'react-input-range/lib/css/index.css'
import './Filter.scss'

export function Filter(props) {

    const elClr = createRef()
    const elSub = createRef()
    const elCategory = createRef()
    const elPrice = createRef()

    const [state, setState] = useState({
        categoryStyle: { display: 'none', top: '' },
        subcategoryStyle: { display: 'none', top: '' },
        colorsStyle: { display: 'none', top: '' },
        priceStyle: { display: 'none', top: '' },
        shirts: ['Polo-Shirts', 'T-Shirts', 'Button-Down-Shirts'],
        pants: ['Elegant-Pants', 'Jeans', 'Cotton-Pants'],
        accessories: ['Coats', 'Suits', 'Socks', 'Belts', 'Underpants', 'Tank - Tops', 'Ties',
            'Tricot', 'Potter - Shorts', 'Sweaters', 'Shlikes', 'Bermudas', 'Cardigans', 'Hoddies'],
        filterBy: {
            name: '',
            category: '',
            color: '',
            subcategory: '',
            sortByPrice: ''
        },
        size: ''


    })

    function setTopStyle(el, style) {
        var rect = el.current.getBoundingClientRect();
        const pageY = rect.bottom

        setState(state => ({ ...state, [style]: { ...state[style], top: pageY, display: 'flex' } }))
    }


    useEffect(() => {
        props.setFilter('', state.filterBy)
    }, [state.filterBy])

    useEffect(() => {
        if (props.subcategory) {
            setState(state => ({ ...state, filterBy: { ...state.filterBy, subcategory: props.subcategory } }))
        }
    }, [props.subcategory])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        state.filterBy[field] = value
    }

    function setCategory(category) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, category } }))
    }

    function setColor(color) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, color } }))
    }
    function setSubCategory(subcategory) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, subcategory } }))

    }
    function setPrice(sortByPrice) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, sortByPrice } }))
    }

    function setPriceRange(value) {
        setState(state => ({ ...state, filterBy: { ...state.filterBy, price: value } }))
    }





    function toggleColors() {
        if (state.colorsStyle.display === 'flex') {
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, subcategoryStyle: { ...state.subcategoryStyle, display: 'none' } }))
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'none' } }))
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'none' } }))
            setTopStyle(elClr, 'colorsStyle')
        }
    }

    function togglePrice() {
        if (state.priceStyle.display === 'flex') {
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, subcategoryStyle: { ...state.subcategoryStyle, display: 'none' } }))
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'none' } }))
            setTopStyle(elPrice, 'priceStyle')
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'none' } }))
        }
    }

    function toggleCategory() {
        if (state.categoryStyle.display === 'flex') {
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, subcategoryStyle: { ...state.subcategoryStyle, display: 'none' } }))
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'none' } }))
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'none' } }))
            setTopStyle(elCategory, 'categoryStyle')
        }
    }

    function toggleSubCategory() {
        if (state.subcategoryStyle.display === 'flex') {
            setState(state => ({ ...state, subcategoryStyle: { ...state.subcategoryStyle, display: 'none' } }))
        } else {
            setState(state => ({ ...state, priceStyle: { ...state.priceStyle, display: 'none' } }))
            setState(state => ({ ...state, categoryStyle: { ...state.categoryStyle, display: 'none' } }))
            setState(state => ({ ...state, colorsStyle: { ...state.colorsStyle, display: 'none' } }))
            setTopStyle(elSub, 'subcategoryStyle')
        }
    }


    function updateSize() {
        // const width = window.innerWidth
        // setState(state => ({ ...state, size: width }))

        setState({
            categoryStyle: { display: 'none', top: '' },
            subcategoryStyle: { display: 'none', top: '' },
            colorsStyle: { display: 'none', top: '' },
            priceStyle: { display: 'none', top: '' },
            shirts: ['Polo-Shirts', 'T-Shirts', 'Button-Down-Shirts'],
            pants: ['Elegant-Pשnts', 'Jeans', 'Cotton-Pants'],
            accessories: ['Coats', 'Suits', 'Socks', 'Belts', 'Underpants', 'Tank - Tops', 'Ties',
                'Tricot', 'Potter - shorts', 'Sweaters', 'Shlikes', 'Bermudas', 'Cardigans', 'Hoddies'],
            filterBy: {
                name: '',
                category: '',
                color: '',
                subcategory: '',
                sortByPrice: ''
            },
            size: ''
        })

    }

    useEffect(() => {

        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);

    }, [])



    return (
        <form className="filter  flex" onSubmit={(ev) => props.setFilter(ev, state.filterBy)} >
            <div className="flex  filter-container ">
                <div className="select flex column">
                    <label >Name</label>
                    <input className="btn-sort" name="name" type="text" placeholder="search" onChange={handleChange} />
                </div>
                <div className="select flex column">
                    <label > Category</label>
                    <button onClick={() => toggleCategory()} ref={elCategory} className='btn-sort'  >{state.filterBy.category}</button>
                    <ul style={state.categoryStyle} className=" flex column" >
                        <li className={state.filterBy.category === 'shirts' ? 'active' : ''} onClick={() => setCategory('shirts')} >Shirts</li>
                        <li className={state.filterBy.category === 'pants' ? 'active' : ''} onClick={() => setCategory('pants')} >Pants</li>
                        <li className={state.filterBy.category === 'accessories' ? 'active' : ''} onClick={() => setCategory('accessories')} >Accessories</li>
                    </ul>
                </div>
                <div className="select flex column">
                    <label > Subcategory</label>
                    <button onClick={() => toggleSubCategory()} ref={elSub} className='btn-sort'  >{state.filterBy.subcategory}</button>
                    <ul style={state.subcategoryStyle} className="flex column">
                        {state.filterBy.category && state[state.filterBy.category].map(c => {
                            return <li key={c} className={state.filterBy.subcategory === c ? 'active' : ''} onClick={() => setSubCategory(c)} > {c}    </li>
                        })}
                    </ul>
                </div>
                <div className="select flex column">
                    <label > Color</label>
                    <button onClick={(ev) => toggleColors(ev)} ref={elClr} className='btn-sort' >{state.filterBy.color}</button>
                    <ul style={state.colorsStyle} className="colors-container flex ">
                        <li title="green" onClick={() => setColor('green')} className="opt option-green" ></li>
                        <li title="jeans" onClick={() => setColor('jeans')} className="opt option-jeans" ></li>
                        <li title="black" onClick={() => setColor('black')} className="opt option-black" ></li>
                        <li title="blue" onClick={() => setColor('blue')} className="opt option-blue"></li>
                        <li title="white" onClick={() => setColor('white')} className="opt option-white" ></li>
                        <li title="pink" onClick={() => setColor('pink')} className="opt option-pink"></li>
                        <li title="brown" onClick={() => setColor('brown')} className="opt option-brown"></li>
                        <li title="beige" onClick={() => setColor('beige')} className="opt option-beige"></li>
                        <li title="maroon" onClick={() => setColor('maroon')} className="opt option-maroon"></li>
                        <li title="gray" onClick={() => setColor('gray')} className="opt option-gray"></li>
                        <li title="lightblue" onClick={() => setColor('lightblue')} className="opt option-lightblue"></li>
                        <li title="lightgreen" onClick={() => setColor('lightgreen')} className="opt option-lightgreen"></li>
                    </ul>
                </div>
                <div className="select flex column">
                    <label >Price</label>
                    <button onClick={() => togglePrice()} ref={elPrice} className='btn-sort'  >{state.filterBy.sortByPrice}</button>
                    <ul style={state.priceStyle} className=" flex column" >
                        <li className={state.filterBy.sortByPrice === 'Low-To-High' ? 'active' : ''} onClick={() => setPrice('Low-To-High')} >Low To High</li>
                        <li className={state.filterBy.sortByPrice === 'High-To-Low' ? 'active' : ''} onClick={() => setPrice('High-To-Low')} >High To Low</li>
                    </ul>
                </div>
            </div>
        </form >
    );

}