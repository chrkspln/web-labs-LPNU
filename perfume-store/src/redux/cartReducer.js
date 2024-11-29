import {ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, SET_CART} from "./actionTypes";

const initialState = {
    cartItems: [],
};

const cartReducer = (state = initialState, action) => {
    let updatedCartItems = [];
    switch (action.type) {
        case SET_CART:
            return { ...state, cartItems: action.payload };

        case ADD_TO_CART:
            const existingItemIndex = state.cartItems.findIndex(
                (item) => item.id == action.payload.id &&
                    item.selectedVolume == action.payload.selectedVolume
            );
            if (existingItemIndex >= 0) {
                updatedCartItems = [...state.cartItems];
                updatedCartItems[existingItemIndex].selectedQuantity += action.payload.selectedQuantity;
            } else {
                updatedCartItems = [...state.cartItems, action.payload];
            }
            return { ...state, cartItems: updatedCartItems };

        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    item => !(item.id === action.payload.id && item.selectedVolume === action.payload.selectedVolume)
                ),
            };

        case CLEAR_CART:
            return { ...state, cartItems: [] };

        default:
            return state;
    }
};

export default cartReducer;