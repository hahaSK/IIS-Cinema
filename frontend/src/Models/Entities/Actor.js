import {attr} from "redux-orm";
import PropTypes from "prop-types";
import CRUDModel from "../ORM/CRUDModel";

export default class Actor extends CRUDModel {}

Actor.modelName = "Actor";

Actor.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    year: attr(),
    picture: attr(),
};

Actor.propTypes = {
    name: PropTypes.string,
};

export const ADD_ACTOR = "ADD_ACTOR";
export const REMOVE_ACTOR = "REMOVE_ACTOR";
export const UPDATE_ACTOR = "UPDATE_ACTOR";