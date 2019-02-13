import { combineReducers } from 'redux';
import PaneReducer from '../store/pane/reducer'
const reducer = combineReducers({
    pane : PaneReducer
});

export default reducer;
