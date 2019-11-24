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