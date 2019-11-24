// @flow

import PropTypes from "prop-types";
import {attr} from "redux-orm";

import CRUDModel from "../ORM/CRUDModel";

export default class ActType extends CRUDModel {}

ActType.modelName = "ActType";

ActType.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
};

ActType.propTypes = {
    name: PropTypes.string,
};