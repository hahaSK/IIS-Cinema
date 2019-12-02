import localStorage from "./localStorage";

/**
 * @function getTokenFromStorage
 * @returns {*}
 */
export function getTokenFromStorage() {

    if (localStorage.getItem("JWT") !== null) {
        return localStorage.getItem("JWT");
    }

    return false;


}