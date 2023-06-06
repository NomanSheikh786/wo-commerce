
import { constants, } from "../Actions";

const { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } = constants


const initialState = {
    wishedProducts: []
};

const addToWishlistHandler = (state, productId) => {
    let final = {
        ...state,
        wishedProducts: [...state.wishedProducts, productId],
    }
    return final
}


const removeFromWishlistHandler = (state, productIdd) => {
    let temp = state.wishedProducts.filter((productId) => productId !== productIdd)
    let final = {
        ...state,
        wishedProducts: temp
    }
    return final
}



const wishlistReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            return addToWishlistHandler(state, action.payload);
        case REMOVE_FROM_WISHLIST:
            return removeFromWishlistHandler(state, action.payload);
        default:
            return state;
    }
};


export { wishlistReducer };
