import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './login/login';
const reducer = combineReducers({
    routing: routerReducer,
    user,
    debug: (state = {}, action) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(action);
      }
      return state;
    }
  });
  
export default reducer;