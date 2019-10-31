import React, { Component } from 'react';
import {connect} from "react-redux";
import InstantAction from "../Models/Utils/InstantAction";
import './App.css';
import {withRouter} from "react-router";

class AppContainer extends Component {

    constructor(props) {
        super(props);
        InstantAction.initiateHistory(this.props.history);
        InstantAction.initiateDispatcher(this.props.dispatch);
        InstantAction.fetchAppData(this);
    }

    render() {
        return (
        <div className={"app-wrapper"}>
            {this.props.children}
        </div>
        );
    }
}

/**
 * This function maps the state to a
 * prop called `state`.
 *
 * In larger apps it is often good
 * to be more selective and only
 * map the part of the state tree
 * that is necessary.
 */
const mapStateToProps = state => (
    {
        app: state.app,
    });

/**
 * Exporting part of the React.Component file
 */
export default withRouter(connect(mapStateToProps)((AppContainer)));