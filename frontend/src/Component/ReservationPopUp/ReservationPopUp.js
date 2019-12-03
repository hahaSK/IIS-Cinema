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

        this.fetchSeats();

        let seats = [];

        for (let seat_num = 0; seat_num < this.props.event.seats.length; seat_num++) {
            seats.push(this.props.event.seats[seat_num]);
        }

        seats.sort(this.sortNumber);

        if (MasterGetter.getCurrentUser() !== null) {
            this.state = {
                seat: seats,
                seatReserved: [],
                seatAvailable: seats,
                occupied: null,
                event: this.props.event,
                email: MasterGetter.getCurrentUser().email
            }
        } else {
            this.state = {
                seat: seats,
                seatReserved: [],
                seatAvailable: seats,
                occupied: null,
                event: this.props.event,
                email: ""
            }
        }
    }

    sortNumber = (a, b) => {
        return a - b;
    }

    onClickData = (seat) => {
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
    };

    handleChange = (event) => {

        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        console.log(name);
        console.log(value);

        this.setState({
            [name]: value
        });
    };

    /**
     * Handle Submit
     * @param event
     */
    handleSubmit = (e) => {

        e.preventDefault();

        if (this.state.seatReserved.length === 0)
            return;

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
            MasterDispatcher.dispatch(response.data);
            this.props.closePopup();
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
            user: this.state.email,
            seats: JSON.stringify(this.state.seatReserved),
        };

        BackendRequest("post", "reservations", data, onSuccess, onError, onError );
    };

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

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const seat_events = session.EventSeat.all().filter((event_seat) => event_seat.event === this.props.event.id).toModelArray();
        const event = this.props.event;

        if (seat_events.length === null || seat_events.length === undefined)
            return null;

        let inputField = "";
        if (MasterGetter.getCurrentUser() === null)
            inputField = <div className={"email-field"}>
                <h3>Zadejte e-mailovou adresu nebo se <a href={'/login'}>přihlašte.</a></h3>
                <input type="text" name={"email"} id={"email"} value={this.state.email} onChange={this.handleChange}/>
            </div>;

        let occupied = [];

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
                            <h3>Počet zvolených míst: <span>{this.state.seatReserved.length} (max. 5)</span></h3>
                        </div>
                        <div className={"schema"}>
                            <div className={"screen"}>
                                <div>Plátno</div>
                            </div>
                            <br/>
                            <div className={"seats"}>
                                {seat_events.map(seat_event => {
                                    if (seat_event.is_available === false)
                                        occupied.push(seat_event._fields.seat);
                                })}
                                <DrawGrid
                                    rows = {this.props.event.hall.rows}
                                    columns = {this.props.event.hall.columns}
                                    seat = { this.state.seat }
                                    reserved = { this.state.seatReserved }
                                    occupied = {occupied}
                                    onClickData = { this.onClickData.bind(this) }
                                />
                            </div>
                            {inputField}
                            <div className={"continue-button"}>
                                <button onClick={this.handleSubmit}>Rezervovat</button>
                            </div>
                        </div>
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