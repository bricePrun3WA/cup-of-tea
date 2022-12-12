import { ADD_PRODUCT, REMOVE_PRODUCT, RESET_BASKET, UPDATE_QUANTITY_PRODUCT } from "../constants/actions";

// SOURCE de vérité du state du panier
let statePanierInit;
if (sessionStorage.getItem('basket')) {
    statePanierInit = JSON.parse(sessionStorage.getItem('basket'));
} else {
    statePanierInit = {
        totalPrice: 0.00, 
        products: []
    };
}

let reducerPanier = (state = statePanierInit, action = {}) => {
    const actualDate = new Date().toISOString();

    switch (action.type) {
        case ADD_PRODUCT:
            const arrayProds = state.products;
            let qtyProduit = action.payload.qty;
            const arrayProdsFiltered = [];
            arrayProds.forEach((aProduct, i) => {
                if (aProduct.product_id === action.payload.product._id
                        && aProduct.conditionnement === action.payload.cond.name) {
                    qtyProduit += aProduct.quantity
                } else {
                    arrayProdsFiltered.push(aProduct)
                }
            });
            arrayProdsFiltered.push({
                product_id: action.payload.product._id,
                name: action.payload.product.name,
                description: action.payload.product.description,
                image: action.payload.product.images[0],
                quantity: qtyProduit,
                price: parseFloat(action.payload.cond.price).toFixed(2),
                conditionnement: action.payload.cond.name,
                date: actualDate
            });

            let arrayProdsTotal = 0;
            arrayProdsFiltered.forEach((currentProduct, i) => {
                arrayProdsTotal += (parseFloat(currentProduct.price) * parseFloat(currentProduct.quantity))
            });
            return {
                ...state,
                products: arrayProdsFiltered,
                totalPrice: arrayProdsTotal
            }
            break;

        case UPDATE_QUANTITY_PRODUCT:
            const arrayProdsUp = state.products;

            const indexProduct = arrayProdsUp.findIndex((aProduct) => {
                return (aProduct.product_id === action.payload.product_id
                            && aProduct.conditionnement === action.payload.cond);
            });
            arrayProdsUp[indexProduct].qty = action.payload.qty;

            let arrayProdsUpdtTotal = 0;
            arrayProdsUp.forEach((currentProduct, i) => {
                arrayProdsUpdtTotal += (parseFloat(currentProduct.price) * parseFloat(currentProduct.quantity))
            });
            return {
                ...state,
                products: arrayProdsUp,
                totalPrice: arrayProdsUpdtTotal
            }
            break;
        case REMOVE_PRODUCT:
            const arrayProdsRm = state.products;
            const arrayProdsRmFiltered = [];
            console.log(action.payload);
            arrayProdsRm.forEach((aProduct, i) => {
                if (!(aProduct.product_id === action.payload.product_id
                        && aProduct.conditionnement === action.payload.cond)) {
                            
                    arrayProdsRmFiltered.push(aProduct)
                }
            });

            let arrayProdsRmTotal = 0;
            arrayProdsRmFiltered.forEach((currentProduct, i) => {
                arrayProdsRmTotal += (parseFloat(currentProduct.price) * parseFloat(currentProduct.quantity))
            });
            return {
                ...state,
                products: arrayProdsRmFiltered,
                totalPrice: arrayProdsRmTotal
            }
            break;
        case RESET_BASKET:
            return {
                ...state,
                products: [],
                totalPrice: 0
            }
            break;
        default:
            return state;
    }

    return state;
}

export default reducerPanier;