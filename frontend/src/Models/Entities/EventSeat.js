import {attr, fk} from "redux-orm";
// import PropTypes from "prop-types";
import CRUDModel from "../ORM/CRUDModel";

export default class EventSeat extends CRUDModel {}

EventSeat.modelName = "EventSeat";

EventSeat.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    seat: fk("Seat"),
    event: fk("Event"),
    available: attr(),
};