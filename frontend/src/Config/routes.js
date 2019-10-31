import React from "react";
import {Route} from "react-router-dom";
import HomeScene from "../Scenes/HomeScene/HomeScene";
import ProgrammeScene from "../Scenes/ProgrammeScene/ProgrammeScene";
import LoginScene from "../Scenes/LoginScene/LoginScene";
import RegisterScene from "../Scenes/RegisterScene/RegisterScene";

/**
 * Export of routes
 * @type {*[]}
 */
const routes = [

    <Route key={1} exact path="/" component={HomeScene}/>,
    <Route key={2} exact path="/programme" component={ProgrammeScene}/>,
    <Route key={3} exact path="/login" component={LoginScene}/>,
    <Route key={4} exact path="/register" component={RegisterScene}/>,

];

export default routes;