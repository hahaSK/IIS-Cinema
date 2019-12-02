import {attr} from "redux-orm";
import PropTypes from "prop-types";
import CRUDModel from "../ORM/CRUDModel";

export default class User extends CRUDModel {}

User.modelName = "User";

User.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    first_name: attr(),
    last_name: attr(),
    username: attr(),
    password: attr(),
};

User.propTypes = {
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    username: PropTypes.string,
};

export const ADD_USER = "ADD_USER";
export const REMOVE_USER = "REMOVE_USER";
export const UPDATE_USER = "UPDATE_USER";