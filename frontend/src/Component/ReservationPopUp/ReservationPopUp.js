import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import "./ReservationPopUp.css";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import DrawGrid from "./DrawGrid";
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import orm from "../../Models/ORM";
import {ADD_HALL} from "../../Models/Entities/Hall";
import InstantAction from "../../Models/Utils/InstantAction";
import MasterGetter from "../../Models/Utils/MasterGetter";
import {ADD_RESERVATION} from "../../Models/Entities/Reservation";


class ReservationPopUp extends Component {

    constructor(props) {
        super(props);

        let seats = [];

        for (let seat_num = 1; seat_num <= this.props.event.seats.length; seat_num++)
            seats.push(seat_num);

        this.state = {
            seat: seats,
            seatAvailable: this.props.event.seats,
            seatReserved: [],
            occupied: null,
            event: this.props.event,
        }
    }

    onClickData(seat) {
        if(this.state.seatReserved.indexOf(seat) > -1 ) {
            this.setState({
                seatAvailable: this.state.seatAvailable.concat(seat),
                seatReserved: this.state.seatReserved.filter(res => res != seat)
            })
        } else {
            if(this.state.seatReserved.length < 5) {
                this.setState({
                    seatReserved: this.state.seatReserved.concat(seat),
                    seatAvailable: this.state.seatAvailable.filter(res => res != seat)
                })
            }
        }
    }

    /**
     * Handle Submit
     * @param event
     */
    handleSubmit = (e) => {

        e.preventDefault();

        /**
         * Function on success adding
         */
        const onSuccess = (response) => {

            if (response.data.reservation !== undefined) {
                InstantAction.dispatch({
                    type: ADD_RESERVATION,
                    payload: response.data.reservation,
                });
            }
            //this.props.handler();
            InstantAction.setToast("Rezervace vytvořena");
        };

        /**
         * On Error
         * @param response
         */
        const onError = (response) => {

        };

        /**
         * Payload to send
         * @type {{areaId: *}}
         */
        const data = {
            event: this.state.event.id,
            user: MasterGetter.getCurrentUser().id,
            seats: JSON.stringify(this.state.seatReserved),
        };

        console.log("zasílaná data");
        console.log(data);

        BackendRequest("post", "reservations", data, onSuccess, onError, onError );
    }

    fetchSeats = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "seats-in-event/" + this.props.event.id, null, onSuccess);
    };

    componentWillMount() {
        this.fetchSeats();
    }

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const seat_events = session.EventSeat.all().toModelArray(); //obsazená
        const event = this.props.event;

        if (seat_events.length === null || seat_events.length === undefined)
            return null;

        let occupied = [];

        console.log("---");
        for (let i = 0; i < event.seats.length; i++)
            console.log(event.seats[i]);

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className={"header-and-close"}>
                        <h1>{event.act.name} <span>({event.hall.name})</span></h1>
                        <FontAwesomeIcon className={"font-awesome-icon"} icon={faWindowClose} onClick={this.props.closePopup}/>
                    </div>
                    <div className={"schema-and-stats"}>
                        <div className={"stats"}>
                            <h3>Celková kapacita: <span>{this.props.event.hall.rows * this.props.event.hall.columns}</span></h3>
                            <h3>Počet volných míst: <span>{this.props.event.seats.length - this.state.seatReserved.length - seat_events.length}</span></h3>
                            <h3>Počet zvolených míst: <span>{this.state.seatReserved.length} (max. 5)</span></h3>
                        </div>
                        <div className={"schema"}>
                            <div className={"screen"}>
                                <div>Plátno</div>
                            </div>
                            <br/>
                            <div className={"seats"}>
                                {seat_events.map(seat_event => {
                                    occupied.push(seat_event._fields.seat);
                                })}
                                <DrawGrid
                                    rows = {this.props.event.hall.rows}
                                    columns = {this.props.event.hall.columns}
                                    seat = { this.state.seat }
                                    available = { this.state.seatAvailable }
                                    reserved = { this.state.seatReserved }
                                    occupied = {occupied}
                                    onClickData = { this.onClickData.bind(this) }
                                />
                            </div>
                        </div>
                    </div>
                    <div className={"continue-button"}>
                        <button onClick={this.handleSubmit}>Pokračovat</button>
                    </div>
                </div>
            </div>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(ReservationPopUp));