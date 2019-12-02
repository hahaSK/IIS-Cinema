import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import "moment/min/locales";
import './ReservationScene.css';
import InstantAction from "../../Models/Utils/InstantAction";
import {REMOVE_RESERVATION, UPDATE_RESERVATION} from "../../Models/Entities/Reservation";
import moment from "moment";
import "moment/min/locales";


class ReservationItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            paid: this.props.reservation.paid,
        };

        moment.locale('cs');
    }

    /**
     * Handle Delete Click
     * @param event
     */
    handleDeleteClick = () => {

        const {reservation} = this.props;

        /**
         * Delete reservation
         * @param response
         */
        const onSuccess = (response) => {

            InstantAction.dispatch({
                type: REMOVE_RESERVATION,
                payload: reservation.id,
            });

            MasterDispatcher.dispatch(response.data);
            InstantAction.setToast("Rezervace zrušena");
        };

        BackendRequest("delete", "reservation/" + reservation.id, null, onSuccess);
    };

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

        this.forceUpdate();
        this.handleSubmit();
    };

    handleSubmit = (event) => {

        const { reservation } = this.props;

        console.log("paid");
        console.log(this.state.paid);

        /**
         * On Error
         * @param response
         */
        const onError = (response) => {

            this.setState({
                error: response.status
            });

        };

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            const data = response.data;

            if (data.reservation !== undefined) {
                InstantAction.dispatch({
                    type: UPDATE_RESERVATION,
                    payload: data.reservation,
                });
            }

            MasterDispatcher.dispatch(response.data);
            if (this.state.paid)
                InstantAction.setToast("Rezervace zaplacena");
            else
                InstantAction.setToast("Rezervace nezaplacena");
        };

        /**
         * Payload
         * @type {{role: string|string}}
         */
        const data = {
            paid: this.state.paid,
            user: reservation._fields.user,
            event: reservation._fields.event,
            seats: JSON.stringify(reservation._fields.seats)
        };

        BackendRequest("put", "reservation/" + reservation.id, data, onSuccess, onError);
    };

    render() {

        const { reservation } = this.props;

        return (
            <Row>
                <Col xs={2}>{reservation._fields.user}</Col>
                <Col xs={3}>{reservation.event.act.name}</Col>
                <Col xs={2}>{moment(reservation.event.date).format("D. MMMM")} {moment(reservation.event.date).format("HH:mm")}</Col>
                <Col xs={2}>{reservation._fields.seats.length}</Col>
                <Col xs={1}>
                    <input type="checkbox" defaultValue={this.state.paid} name="paid" onChange={this.handleInputChange}/>
                </Col>
                <Col xs={2}>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(ReservationItem));