import {attr} from "redux-orm";
import PropTypes from "prop-types";
import CRUDModel from "../ORM/CRUDModel";

export default class Director extends CRUDModel {}

Director.modelName = "Director";

Director.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    year: attr(),
    picture: attr(),
};

Director.propTypes = {
    name: PropTypes.string,
};

export const ADD_DIRECTOR = "ADD_DIRECTOR";
export const REMOVE_DIRECTOR = "REMOVE_DIRECTOR";
export const UPDATE_DIRECTOR = "UPDATE_DIRECTOR";