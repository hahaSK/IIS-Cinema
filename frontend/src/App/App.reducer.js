import {
    SET_APP_LOADED,
    SET_CONFIRMATION,
    SET_APP_URL,
    RESET_STORE, SET_LOGGED_USER, SET_SEARCH,
} from "./App.actions";

/**
 * App Initial State
 * @type {{appLoaded: boolean, loggedMember: boolean, url: string, appMessage: null}}
 */
const INITIAL_STATE = {
    appLoaded: false,
    loggedUser: null,
    search: "",
    url: "",
};


/**
 * HomeScene App Reducer
 * @param state
 * @param action
 * @returns {*}
 */
export function appReducer(state: Object = INITIAL_STATE, action: any) {

    switch (action.type) {
        case SET_APP_LOADED:
            return Object.assign({}, state, {
                appLoaded: action.status
            });
        case SET_CONFIRMATION:
            return Object.assign({}, state, {
                confirmation: action.data
            });
        case SET_APP_URL:
            return Object.assign({}, state, {
                url: action.url
            });
        case SET_LOGGED_USER:
            return Object.assign({}, state, {
                loggedUser: action.id
            });
        case SET_SEARCH:
            return Object.assign({}, state, {
                search: action.searchTerm,
            });
        case RESET_STORE:
            return INITIAL_STATE;
        default:
            return state;
    }
}