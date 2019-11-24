import {attr, fk} from "redux-orm";
//import PropTypes from "prop-types";
import CRUDModel from "../ORM/CRUDModel";

export default class Seat extends CRUDModel {}

Seat.modelName = "Seat";

Seat.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    row: attr(),
    seat_number: attr(),
    hall: fk("Hall"),
};