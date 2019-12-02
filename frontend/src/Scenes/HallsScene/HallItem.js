import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import "moment/min/locales";
import './HallsScene.css';
import InstantAction from "../../Models/Utils/InstantAction";
import {REMOVE_HALL} from "../../Models/Entities/Hall";

class HallItem extends Component {

    /**
     * Handle Delete Click
     * @param event
     */
    handleDeleteClick = () => {

        const {hall} = this.props;

        /**
         * Delete event
         * @param response
         */
        const onSuccess = (response) => {

            InstantAction.dispatch({
                type: REMOVE_HALL,
                payload: hall.id,
            });

            MasterDispatcher.dispatch(response.data);

            InstantAction.setToast("Sál odstraněn");
        };

        BackendRequest("delete", "hall/" + hall.id, null, onSuccess);
    };

    render() {

        const { hall } = this.props;

        return (
            <Row>
                <Col xs={2}>{hall.name}</Col>
                <Col xs={3}>{hall.address.street2}, {hall.address.city} {hall.address.psc} </Col>
                <Col xs={2}>{hall.rows}</Col>
                <Col xs={2}>{hall.columns}</Col>
                <Col xs={3}>
                    <button onClick={() => {this.handleDeleteClick()}}>Zrušit</button>
                </Col>
            </Row>
        );
    }
}

/**
 * This function maps actions to props
 * and binds them so they can be called
 * directly.
 *
 * In this case all actions are mapped
 * to the `actions` prop.
 */
const mapDispatchToProps = dispatch => (
    {
        dispatch: (something) => {
            dispatch(something);
        }
    }
);

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
        entities: state.entities,
    });

/**
 * Exporting part of the React.Component file
 */
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(HallItem));