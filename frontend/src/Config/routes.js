import React from "react";
import {Route} from "react-router-dom";
import ProgrammeScene from "../Scenes/ProgrammeScene/ProgrammeScene";
import LoginScene from "../Scenes/LoginScene/LoginScene";
import RegisterScene from "../Scenes/RegisterScene/RegisterScene";
import HallsScene from "../Scenes/HallsScene/HallsScene";
import UsersScene from "../Scenes/UsersScene/UsersScene";
import ReservationsScene from "../Scenes/ReservationsScene/ReservationsScene";

/**
 * Export of routes
 * @type {*[]}
 */
const routes = [

    <Route key={1} exact path="/" component={ProgrammeScene}/>,
    <Route key={2} exact path="/programme" component={ProgrammeScene}/>,
    <Route key={3} exact path="/halls" component={HallsScene}/>,
    <Route key={4} exact path="/users" component={UsersScene}/>,
    <Route key={5} exact path="/reservations" component={ReservationsScene}/>,
    <Route key={6} exact path="/login" component={LoginScene}/>,
    <Route key={7} exact path="/register" component={RegisterScene}/>,

];

export default routes;