import React from "react";
import {Route} from "react-router-dom";
import ProgrammeScene from "../Scenes/ProgrammeScene/ProgrammeScene";
import LoginScene from "../Scenes/LoginScene/LoginScene";
import RegisterScene from "../Scenes/RegisterScene/RegisterScene";
import UsersScene from "../Scenes/UsersScene/UsersScene";

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

];

export default routes;