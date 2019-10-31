import orm from "../ORM/index";
import MasterGetter from "./MasterGetter";
import InstantAction from "./InstantAction";
import {appLoading} from "../../App/App.actions";

/**
 * @class MasterDispatcher
 */
export default class MasterDispatcher {
    /**
     * Constructor
     */
    constructor(payload) {

        this.payload = payload;
        this.rawModelName = null;
        this.entities = MasterGetter.getEntities();
        this.ormSession = orm.session(this.entities);
        this.keys = Object.keys(payload);
        this.currentModelName = "";
    }

    /**
     * Dispatch function for multi object payload
     * @param payload
     */
    static dispatch(payload) {
        InstantAction.dispatch(appLoading(true));
        let self = new MasterDispatcher(payload);
        self.processAll();
    }

    /**
     * Object has model representation in ORM
     * @param key
     * @return {boolean}
     */
    hasAccessibleModel(key) {

        this.rawModelName = key;
        let name = "";

        key.split("_").forEach((part) => {
            name += part.charAt(0).toUpperCase() + part.slice(1);
        });

        this.currentModelName = name;
        return this.ormSession.initialState.hasOwnProperty(this.currentModelName);

    }

    /**
     * Proceed Unit
     * @param payload
     */
    processUnit(payload: Object) {

        this.modelInstance = this.ormSession[this.currentModelName];

        if (payload === undefined || payload === null) {
            // Case of error
            console.error(this.modelInstance, payload);
            return;
        }

        // Case of error and missing id
        if (!Array.isArray(payload)) {
            if (payload.id === undefined) {
                console.error(payload);
                return;
            }
        }

        /**
         * Check if model with id exists
         */
        if (Array.isArray(payload)) {
            this.dispatchFunction = "BULK_" + this.rawModelName.toUpperCase();
        } else {
            this.dispatchFunction = ((this.modelInstance.idExists(payload.id)) ? "UPDATE_" : "ADD_") + this.rawModelName.toUpperCase();
        }

        InstantAction.dispatch({
            type: this.dispatchFunction,
            payload: payload,
        });
    }

    /**
     * Process all objects
     */
    processAll() {

        this.keys.forEach((key) => {
            /**
             * Check if item has Model representation in ORM
             */
            if (this.hasAccessibleModel(key)) {
                /**
                 * Check empty item
                 */
                if (this.payload === null) {
                    return;
                }

                /**
                 * Check if item has multiple items in array
                 */
                this.processUnit(this.payload[key]);

            } else {
                console.log("Model hasn't accessible model", key);
            }
        });

        /**
         * Loading finished
         */
        InstantAction.dispatch(appLoading(false));
    }
}