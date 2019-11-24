import {attr, fk} from "redux-orm";
import PropTypes from "prop-types";
import CRUDModel from "../ORM/CRUDModel";

export default class Hall extends CRUDModel {}

Hall.modelName = "Hall";

Hall.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    name: attr(),
    addres: fk("Address"),
    rows: attr(),
    columns: attr(),
};

Hall.propTypes = {
    name: PropTypes.string,
};