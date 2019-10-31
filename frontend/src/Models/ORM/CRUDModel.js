// @flow

import {Model, Session} from "redux-orm";

import ValidatingModel from "./ValidatingModel";

/**
 * Model with default reducer which can handle add, update and remove action.
 */
export default class CRUDModel extends ValidatingModel {
    /**
     * Reducer
     * @param action
     * @param klass
     * @param session
     * @return {undefined}
     */
    static reducer(action: Object, klass: Model, session: Session) {

        if (typeof session === "undefined") {
            throw new Error([
                `Tried to create a ${klass.modelName} model instance without a session. `,
                "Create a session using `session = orm.session()` and call ",
                `\`session["${klass.modelName}"].create\` instead.`,
            ].join(""));
        }

        // Connect to session
        CRUDModel.connect(session);

        // Model Name
        const modelName = klass.modelName.replace(/([A-Z])/g, "_$1").replace(/^_/, "").toUpperCase();


        /**
         * Handling payload as single instance
         */
        switch (action.type) {
            case "ADD_" + modelName:
                if (!klass.idExists(action.payload.id)) {
                    klass.create(action.payload);
                } else {
                    klass.withId(action.payload.id).update(action.payload);
                }
                break;
            case "UPDATE_" + modelName:
                klass.withId(action.payload.id).update(action.payload);
                break;
            case "REMOVE_" + modelName:
                const entity = klass.withId(action.payload);
                entity.delete();
                break;
            case "BULK_" + modelName:
                action.payload.forEach(item => {
                    if (!klass.idExists(item.id)) {
                        klass.create(item);
                    } else {
                        klass.withId(item.id).update(item);
                    }
                });
                break;
            default:
                return undefined;
        }

    }
}
