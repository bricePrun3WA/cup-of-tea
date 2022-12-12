import {
    CONNEXION, DECONNEXION, GET_SESSION,
    ADD_PRODUCT, UPDATE_QUANTITY_PRODUCT, RESET_BASKET, REMOVE_PRODUCT
} from "../constants/actions";

///////////////////
// LOGIN
///////////////////
const connexion = payload => {
    return {
        type: CONNEXION, payload
    }
};

const deconnexion = payload => {
    return {
        type: DECONNEXION, payload
    }
};

const getSession = payload => {
    return {
        type: GET_SESSION, payload
    }
};

///////////////////
// PANIER
///////////////////
const addProduct = payload => {
    return {
        type: ADD_PRODUCT, payload
    }
};

const updateQuantityProduct = payload => {
    return {
        type: UPDATE_QUANTITY_PRODUCT, payload
    }
};

const removeProduct = payload => {
    return {
        type: REMOVE_PRODUCT, payload
    }
};

const resetBasket = payload => {
    return {
        type: RESET_BASKET, payload
    }
};

export {
    connexion,
    deconnexion,
    getSession,

    addProduct,
    updateQuantityProduct,
    removeProduct,
    resetBasket
}