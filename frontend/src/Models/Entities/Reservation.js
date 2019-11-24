import {attr, fk} from "redux-orm";
//import PropTypes from "prop-types";
import CRUDModel from "../ORM/CRUDModel";

export default class Reservation extends CRUDModel {}

Reservation.modelName = "Reservation";

Reservation.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    user: fk("User"),
    event: fk("Event"),
    paid: attr(),
    seats: fk("Seat"),
};