// https://github.com/tommikaikkonen/redux-orm

// @flow

import {ORM} from "redux-orm";
import * as Models from "../Models";
// Create a Schema instance
const orm = new ORM();

// and hook up models
Object.keys(Models).forEach(key => {
    orm.register(Models[key]);
});

export default orm;
