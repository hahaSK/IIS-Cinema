// https://github.com/tommikaikkonen/redux-orm

// @flow

import {ORM} from "redux-orm";
import Act from "../Entities/Act";
import Actor from "../Entities/Actor";
import ActType from "../Entities/ActType";
import Address from "../Entities/Address";
import Director from "../Entities/Director";
import Event from "../Entities/Group";
import EventSeat from "../Entities/EventSeat";
import Genre from "../Entities/Genre";
import Reservation from "../Entities/Reservation";
import Hall from "../Entities/Hall";
import Seat from "../Entities/Seat";
import User from "../Entities/User";


// Create a Schema instance
const orm = new ORM();

// and hook up models
orm.register(
    Act,
    Actor,
    ActType,
    Address,
    Director,
    Event,
    EventSeat,
    Genre,
    Hall,
    Reservation,
    Seat,
    User,
);

export default orm;
