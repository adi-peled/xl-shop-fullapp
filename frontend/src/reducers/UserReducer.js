const INITIAL_STATE = {
    user: null
}

export function UserReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }
        case 'ADD_ITEM_TO_CART':
            return {
                ...state, user: { ...state.user, cart: [...state.user.cart, action.item] }
            }
        default:
            return state
    }
}