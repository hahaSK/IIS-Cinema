import orm from "../ORM";
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
     * @param item
     */
    processUnit(item: Object) {

        this.modelInstance = this.ormSession[this.currentModelName];

        if (item === undefined || item === null) {
            return;
        }

        if (item.id === undefined) {
            return;
        }


        /**
         * Check if model with id exists
         */
        this.dispatchFunction = ((this.modelInstance.idExists(item.id)) ? "UPDATE_" : "ADD_") + this.rawModelName.toUpperCase();

        InstantAction.dispatch({
            type: this.dispatchFunction,
            payload: item,
        });
    }

    /**
     * Process all objects
     */
    processAll() {

        // InstantAction.dispatch(setAppLoaded(false));

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
                if (Array.isArray(this.payload[key])) {
                    /**
                     * Is Array
                     */
                    this.payload[key].forEach((item) => {
                        this.processUnit(item);
                    });

                } else {
                    /**
                     * Is Unit object
                     */
                    this.processUnit(this.payload[key]);
                }
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