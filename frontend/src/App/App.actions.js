export const SET_APP_LOADED = "@@cinema/SET_APP_LOADED";
export const SET_APP_URL = "@@cinema/SET_APP_URL";
export const SET_LOGGED_USER = "@@cinema/SET_LOGGED_USER";
export const RESET_STORE = "@@cinema/RESET_STORE";
export const SET_SEARCH = "@@cinema/SET_SEARCH";
export const SET_APP_LOADING = "@@cinema/SET_APP_LOADING";

/**
 * Set App Loaded
 * @param status
 * @returns {{type: string, status: boolean}}
 */
export function setAppLoaded(status: boolean) {

    return {type: SET_APP_LOADED, status};
}

/**
 * Set App Loading
 * @param status
 * @returns {{type: string, status: boolean}}
 */
export function appLoading(status: boolean) {

    return {type: SET_APP_LOADING, status};
}


/**
 * Set App Url
 * @param url
 * @returns {{type: string, url: *}}
 */
export function setAppUrl(url) {

    return {type: SET_APP_URL, url};
}

/**
 * Set Search
 * @param searchTerm
 * @return {{type: string, searchTerm: *}}
 */
export function setSearch(searchTerm) {

    return {type: SET_SEARCH, searchTerm};
}


/**
 * Set Logged User
 * @param id
 * @returns {{type: string, id: string}}
 */
export function setLoggedUser(id: string) {
    return {
        type: SET_LOGGED_USER,
        id,
    };
}