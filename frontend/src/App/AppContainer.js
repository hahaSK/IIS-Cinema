import React, { Component } from 'react';
import {connect} from "react-redux";
import InstantAction from "../Models/Utils/InstantAction";
import './App.css';
import {withRouter} from "react-router";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AppContainer.css";

class AppContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            expectingResponse: true,
        };

        InstantAction.initiateHistory(this.props.history);
        InstantAction.initiateDispatcher(this.props.dispatch);
    }

    loadCoreData = () => {
        InstantAction.fetchAppData(this);
    };

    componentWillMount() {
        this.loadCoreData();
    }

    render() {

        if(this.state.expectingResponse)
            return null;

        return (
            <div className={"app-wrapper"}>

                <ToastContainer
                    position="top-left"
                    autoClose={3500}
                    newestOnTop={true}
                    closeOnClick
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                    toastClassName="cinema-toast"
                />

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