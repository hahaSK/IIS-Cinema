import {attr} from "redux-orm";
import PropTypes from "prop-types";
import CRUDModel from "../ORM/CRUDModel";

export default class User extends CRUDModel {}

User.modelName = "User";

User.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    username: attr(),
    password: attr(),
};

User.propTypes = {
    username: PropTypes.string,
};