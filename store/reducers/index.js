import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
const reducer = combineReducers({
    routing: routerReducer,
    debug: (state = {}, action) => {
      if (process.env.NODE_ENV === 'development') {
        // console.log(action);
      }
      return state;
    }
  });
  
export default reducer;