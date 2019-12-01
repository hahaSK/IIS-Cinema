// @flow

import MasterDispatcher from "./MasterDispatcher";
import {RESET_STORE, setAppLoaded, setLoggedUser} from "../../App/App.actions";
import {withRouter} from "react-router";
import {dispatcher} from "../../Config/store";
import BackendRequest from "../REST/BackendRequest";
import {toast} from "react-toastify";

/**
 * Instant Action
 */
class InstantAction {

    /**
     * Fetch App Data
     */
    static fetchAppData(parent) {

        /**
         * Initiate fixtures
         * @type {{trademark_type: *[]}}
         */

        /**
         * After Success
         * @param response
         */
        const onSuccess = (response) => {

            const data = response.data;

            console.log(data.id);
            InstantAction.dispatch(setLoggedUser(data.id));
            InstantAction.dispatch(setAppLoaded(true));
            MasterDispatcher.dispatch({user: data});

        };

        const onError = (error) => {

        };

        BackendRequest("get", "current_user", null, onSuccess, onError, onError);
    }

    /**
     * Pure Dispatcher
     * @param data
     */
    static dispatch(data) {
        dispatcher(data);
    }

    /**
     * Init
     * @param history
     */
    static initiateHistory(history) {
        InstantAction.history = history;
    }

    /**
     * Initiate Dispatcher
     * @param dispatcher {func}
     */
    static initiateDispatcher(dispatcher) {
        InstantAction.dispatcher = dispatcher;
    }

    /**
     * Set Dialog toast
     * @param message
     */
    static setToast(message) {
        console.log("Sending Toast");
        toast(message);
    }

    /**
     * Redirect
     * @param path
     */
    static redirect(path) {

        InstantAction.history.push(path);

    }

    /**
     * Reset Store initial state
     */
    static resetStore() {

        InstantAction.dispatch({
            type: RESET_STORE
        });

    }
}


export default InstantAction = withRouter(InstantAction);