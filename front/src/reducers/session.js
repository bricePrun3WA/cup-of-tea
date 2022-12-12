import { CONNEXION, DECONNEXION, GET_SESSION } from "../constants/actions";

// SOURCE de vérité du state de session
let stateSessionInit;
if (sessionStorage.getItem('user')) {
    stateSessionInit = JSON.parse(sessionStorage.getItem('user'));
} else {
    stateSessionInit = {
        isLogged: false,
        user: {}
    }
}

let reducerSession = (state = stateSessionInit, action = {}) => {
    if (action.payload && action.payload.e) {
        action.payload.e.preventDefault();
    }

    switch (action.type) {
        case CONNEXION:
            if (action.payload.user._id) {
                return {
                    ...state,
                    isLogged: true,
                    user: action.payload.user
                }
            }
            break;
        case DECONNEXION:
            if (action.payload.done === 'ok') {
                return {
                    ...state,
                    isLogged: false,
                    user: {}
                }
            }
            break;
        case GET_SESSION:
            return {
                ...state,
                isLogged: action.payload.isLogged,
                user: action.payload.user
            }
            break;
        default:
            return state;
    }

    return state;
}

export default reducerSession;