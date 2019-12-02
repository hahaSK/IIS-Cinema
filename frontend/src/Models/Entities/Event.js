import {attr, fk} from "redux-orm";
import PropTypes from "prop-types";
import CRUDModel from "../ORM/CRUDModel";

export default class Event extends CRUDModel {}

Event.modelName = "Event";

Event.fields = {
    id: attr(), // non-relational field for any value; optional but highly recommended
    hall: fk("Hall"),
    date: attr(),
    price: attr(),
    act: fk("Act"),
};

Event.propTypes = {
    date: PropTypes.any,
};

export const ADD_EVENT = "ADD_EVENT";
export const REMOVE_EVENT = "REMOVE_EVENT";
export const UPDATE_EVENT = "UPDATE_EVENT";