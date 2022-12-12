import { combineReducers } from 'redux';

import reducerSession from './session';
import reducerPanier from './panier';

export default combineReducers({
    reducerSession : reducerSession,
    reducerPanier : reducerPanier
});