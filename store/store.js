import {createStore, applyMiddleware} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import rootReducer from "./reducers/index";

const initialState = {};

export default function configureStore () {
    const middlewares = [thunk];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const storeEnhancers = [middlewareEnhancer];
    const composedEnhancer = composeWithDevTools(...storeEnhancers);

    const store = createStore(
        rootReducer,
        initialState,
        composedEnhancer
    );

    if(process.env.NODE_ENV !== "production") {
        if(module.hot) {
            module.hot.accept(() =>{
                const newRootReducer = require("./reducers/index").default();
                store.replaceReducer(newRootReducer)
            });
        }
    }

    if (window) {
        window.store = store;
    }

    return store;
}