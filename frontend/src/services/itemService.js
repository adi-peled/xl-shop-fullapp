import httpService from './httpService'

export const itemService = {
    getItems,
    getEmptyItem,
    removeItem,
    saveItem,
    getItemById,
    getItemsByCategory
}



// const items = [

// ]

async function getItems(filterBy = null) {
    if (!filterBy) {
        return await httpService.get(`item`)
    } else {
        const { category, name, sortByPrice, subcategory, color } = filterBy
        return await httpService.get('item' + `?category=${category}&name=${name}&sortByPrice=${sortByPrice}&subcategory=${subcategory}&color=${color}`)
    }

}

async function getItemsByCategory(category, id) {
    let items = await httpService.get('item' + `?category=${category}`)
    items = items.filter(item => item._id !== id)
    return items
}


async function removeItem(id) {
    return await httpService.delete(`item/${id}`)
}

function sort(arr) {
    return arr
}

async function _updateItem(item) {
    return await httpService.put(`item/${item._id}`, item)
}


async function _addItem(item) {
    return await httpService.post(`item/`, item)
}

function saveItem(item) {
    return item._id ? _updateItem(item) : _addItem(item)
}

function getEmptyItem() {
    console.log('empty');
    return {
        name: '',
        price: '',
        category: 'accessories',
        subcategory: 'Coat',
        sizes: [],
        colors: [],
        imgUrls: []
    }
}


async function getItemById(id) {
    return await httpService.get(`item/${id}`)
}

