import React, { Component } from 'react';
import {Provider as ReduxProvider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {store} from "../Config/store";
import routes from "../Config/routes";
import './App.css';
import {Switch} from "react-router-dom";
import AppContainer from "./AppContainer";

export default class App extends Component {

    render() {
      return (
          <ReduxProvider store={store}>
              <BrowserRouter>
                  <AppContainer className="app-wrapper">
                      <Switch>
                          {routes}
                      </Switch>
                  </AppContainer>
              </BrowserRouter>
          </ReduxProvider>
      );
  }
}
