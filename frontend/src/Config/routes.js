import React from "react";
import {Route} from "react-router-dom";
import ProgrammeScene from "../Scenes/ProgrammeScene/ProgrammeScene";
import LoginScene from "../Scenes/LoginScene/LoginScene";
import RegisterScene from "../Scenes/RegisterScene/RegisterScene";
import UsersScene from "../Scenes/UsersScene/UsersScene";
import ActsScene from "../Scenes/ActsScene/ActsScene";
import HallsScene from "../Scenes/HallsScene/HallsScene";
import MyProfileScene from "../Scenes/MyProfileScene/MyProfileScene";
import ReservationScene from "../Scenes/ReservationScene/ReservationScene";

/**
 * Export of routes
 * @type {*[]}
 */
const routes = [

    <Route key={1} exact path="/" component={ProgrammeScene}/>,
    <Route key={2} exact path="/programme" component={ProgrammeScene}/>,
    <Route key={3} exact path="/login" component={LoginScene}/>,
    <Route key={4} exact path="/register" component={RegisterScene}/>,
    <Route key={5} exact path="/users" component={UsersScene}/>,
    <Route key={6} exact path="/acts" component={ActsScene}/>,
    <Route key={7} exact path="/halls" component={HallsScene}/>,
    <Route key={8} exact path="/my_profile" component={MyProfileScene}/>,
    <Route key={9} exact path="/reservations" component={ReservationScene}/>,

];

export default routes;