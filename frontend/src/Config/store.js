// @flow

import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import {responsiveStateReducer, responsiveStoreEnhancer} from "redux-responsive";
import {createReducer} from "redux-orm";

// ORM
import orm from "../Models/ORM/index";

// App Reducer
import {appReducer} from "../App/App.reducer";

/**
 * Create and export REDUX STORE
 * @type {Store<any & any> & any}
 */
export const store = createStore(
    // Combined reducers
    combineReducers({
        // Responsivity reducer
        browser: responsiveStateReducer,
        // Redux ORM
        entities: createReducer(orm),
        // Application Core
        app: appReducer,
    }),
    // Compose middleware
    compose(
        responsiveStoreEnhancer,
        composeWithDevTools(
        applyMiddleware(thunkMiddleware)
        )
    )
);

export const dispatcher = store.dispatch;