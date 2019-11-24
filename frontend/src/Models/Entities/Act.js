// @flow

import PropTypes from "prop-types";
import {attr, fk} from "redux-orm";
import CRUDModel from "../ORM/CRUDModel";

export default class Act extends CRUDModel {}

Act.modelName = "Act";

Act.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    type: fk("ActType"),
    picture: attr(),
    genre: fk("Genre"),
    cast: fk("Actor"),
    director: fk("Director"),
    rating: attr(),
    desription: attr(),
};


Act.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
};