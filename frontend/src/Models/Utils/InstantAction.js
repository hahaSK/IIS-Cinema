// @flow

import MasterDispatcher from "./MasterDispatcher";
import {RESET_STORE} from "../../App/App.actions";
import {withRouter} from "react-router";
import {Event} from "../Models";
import {User} from "../Models";

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
        let fixtures = {
            event: Event.fixtures,
            user: User.fixtures,
        };

        MasterDispatcher.dispatch(fixtures);


        // /**
        //  * After Success
        //  * @param response
        //  */
        // const afterSuccess = (response) => {
        //
        //     const data = response.data;
        //
        //     InstantAction.dispatch(setLoggedUser(data.user.id));
        //     InstantAction.dispatch(setAppLoaded(true));
        //
        //
        //     parent.setState({
        //         loadingData: false,
        //     }, () => {
        //
        //     });
        //
        // };
        //
        //
        // BackendRequest({
        //     method: "get",
        //     endpoint: "user",
        //     afterSuccess: afterSuccess,
        // });

    }

    /**
     * Pure Dispatcher
     * @param data
     */
    static dispatch(data) {
        InstantAction.dispatcher(data);
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
     * Redirect
     * @param path
     */
    static redirect(path) {

        console.log("Pushing: ", path);

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