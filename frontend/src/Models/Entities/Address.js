import {attr} from "redux-orm";
import PropTypes from "prop-types";
import CRUDModel from "../ORM/CRUDModel";

export default class Address extends CRUDModel {}

Address.modelName = "Address";

Address.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    street1: attr(),
    street2: attr(),
    city: attr(),
    psc: attr(),
    country: attr(),
};

Address.propTypes = {
    street1: PropTypes.string,
    street2: PropTypes.string,
    city: PropTypes.string,
};