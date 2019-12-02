// @flow

import PropTypes from "prop-types";
import {attr} from "redux-orm";

import CRUDModel from "../ORM/CRUDModel";

export default class Genre extends CRUDModel {}

Genre.modelName = "Genre";

Genre.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
};

Genre.propTypes = {
    name: PropTypes.string,
};

export const ADD_GENRE = "ADD_GENRE";
export const REMOVE_GENRE = "REMOVE_GENRE";
export const UPDATE_GENRE = "UPDATE_GENRE";