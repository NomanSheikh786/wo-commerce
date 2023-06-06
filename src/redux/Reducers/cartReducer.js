
import { constants } from "../Actions";
const { ADD_QUANTITY, ADD_TO_CART, REMOVE_FROM_CART, RESET_CART, SUB_QUANTITY, } = constants

const initialState = {
    products: [],
    total: 0,
};

const _findProductById = (state, productId) =>
    state.products.find(item => item.id === productId);

const _updateProduct = (
    products,
    product
) =>
    products?.map((item) => {
        if (item.id === product.id) {
            return product;
        }

        return item;
    });

const _mapAddQuantityState = (
    state,
    existingProduct
) => ({
    ...state,
    products: _updateProduct(state.products, {
        ...existingProduct,
        quantity: existingProduct.quantity + 1
    }),
    total: state.total + Number(existingProduct.price)
});

const _mapRemoveFromCartState = (
    state,
    existingProduct
) => ({
    ...state,
    products: state.products.filter(item => item.id !== existingProduct.id),
    total: state.total - Number(existingProduct.price) * existingProduct.quantity
});

const addQuantityHandler = (state, productId) => {
    const existingProduct = _findProductById(state, productId);

    if (existingProduct) {
        return _mapAddQuantityState(state, existingProduct);
    }

    return state;
};

const addToCartHandler = (state, product) => {
    const existingProduct = _findProductById(state, product.id);

    if (existingProduct) {
        return _mapAddQuantityState(state, existingProduct);
    }


    return {
        ...state,
        products: [
            ...state.products,
            {
                ...product,
                quantity: 1
            }
        ],
        total: state.total + Number(product.price)
    };
};

const removeFromCartHandler = (
    state,
    productId
) => {
    const existingProduct = _findProductById(state, productId);

    if (existingProduct) {
        return _mapRemoveFromCartState(state, existingProduct);
    }

    return state;
};

const subQuantityHandler = (state, productId) => {
    const existingProduct = _findProductById(state, productId);

    if (existingProduct) {
        if (existingProduct.quantity <= 1) {
            return _mapRemoveFromCartState(state, existingProduct);
        }

        return {
            ...state,
            products: _updateProduct(state.products, {
                ...existingProduct,
                quantity: existingProduct.quantity - 1
            }),
            total: state.total - Number(existingProduct.price)
        };
    }

    return state;
};

const resetCartHandler = () => initialState;



const cartReducer = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case ADD_TO_CART:
            return addToCartHandler(state, action.payload)
        case REMOVE_FROM_CART:
            return removeFromCartHandler(state, action.payload);
        case ADD_QUANTITY:
            return addQuantityHandler(state, action.payload);
        case SUB_QUANTITY:
            return subQuantityHandler(state, action.payload);
        case RESET_CART:
            return resetCartHandler();
        default:
            return state;
    }
};

export {
    cartReducer
}