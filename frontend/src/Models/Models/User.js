// @flow

import PropTypes from "prop-types";
import {attr} from "redux-orm";

import CRUDModel from "../ORM/CRUDModel";

export default class User extends CRUDModel {}

User.modelName = "User";

User.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    username: attr(),
    first_name: attr(),
    surname: attr(),
    email: attr(),
    password: attr(),
    role: attr(),
};


User.fixtures = [
    {
        id: 1,
        username: "ondrejdacer",
        first_name: "Ondřej",
        surname: "Dacer",
        email: "ondra.dacer@seznam.cz",
        password: "heslo",
        role: "admin",
    },
    {
        id: 2,
        username: "lubomirsvehla",
        first_name: "Lubomír",
        surname: "Švehla",
        email: "lubo.svehla@zoznam.sk",
        password: "heslicko",
        role: "admin",
    },
];

User.propTypes = {
    username: PropTypes.string,
    first_name: PropTypes.string,
    surname: PropTypes.string,
    email: PropTypes.string,
    password: PropTypes.string,
    role: PropTypes.string,
};