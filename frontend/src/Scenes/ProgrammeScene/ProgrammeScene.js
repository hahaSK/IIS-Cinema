import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './ProgrammeScene.css'
import Navigation from "../../Component/Navigation/Navigation";
import MasterGetter from "../../Models/Utils/MasterGetter";
import ActView from "../../Component/PerformanceView/PerformanceView";
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import orm from "../../Models/ORM/index";
import moment from "moment";
import "moment/min/locales";
import NewEvent from "../../Component/NewEvent/NewEvent";
import ReservationPopUp from "../../Component/ReservationPopUp/ReservationPopUp";
import InstantAction from "../../Models/Utils/InstantAction";
import {REMOVE_EVENT} from "../../Models/Entities/Event";

class Programme extends Component {

    state = {
        event: "",
        showAct: false,
        showPerformanceForm: false,
        newEvent: false,
        performanceType: 0,
        showReservationPopUp: false,
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    /**
     * Handle Delete Click
     * @param event
     */
    handleDeleteClick = (deleteEvent) => {

        /**
         * Delete event
         * @param response
         */
        const onSuccess = (response) => {

            InstantAction.dispatch({
                type: REMOVE_EVENT,
                payload: deleteEvent.id,
            });

            MasterDispatcher.dispatch(response.data);

            InstantAction.setToast("Událost zrušena");
        };

        BackendRequest("delete", "event/" + deleteEvent.id, null, onSuccess);
    };

    onEventClick = (eventId) => {
        this.setState({
            event: eventId
        });
        this.toggleAct();
    };

    toggleAct = () => {
        this.setState({
            showAct: !this.state.showAct
        });
    };

    toggleNewEvent = () => {
        this.setState({
            newEvent: !this.state.newEvent
        });
    };

    toggleReservationPopUp = (event) => {
        this.setState({
            showReservationPopUp: !this.state.showReservationPopUp,
            event: event,
        });
    };

    fetchActTypes = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "acttypes", null, onSuccess);
    };

    fetchEvents = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {
            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "events", null, onSuccess);
    };

    fetchActs = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "acts", null, onSuccess);
    };

    fetchHalls = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "halls", null, onSuccess);
    };

    componentWillMount() {
        this.fetchActTypes();
        this.fetchEvents();
        this.fetchActs();
        this.fetchHalls();
        moment.locale('cs');
    }

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const events = session.Event.all().orderBy("date");
        const actTypes = session.ActType.all();

        let today = new Date();

        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Program</h1>
                </div>
                <hr />
                <div className={"body programme"}>
                    <div className={"top-line"}>
                        <div className={"filter-events"}>
                            <h3 style={{margin: '0'}}>Typ představení:</h3>
                            <select name={"performanceType"} onChange={this.handleChange} value={this.state.performanceType}>
                                <option disabled>Zvolte typ představení</option>
                                <option key={0} value={0}>Všechny</option>
                                {actTypes.toModelArray().map(actType => {
                                    return <option key={actType.id} value={actType.id}>{actType.name}</option>;
                                })}
                            </select>
                        </div>
                        {(MasterGetter.getCurrentUser() !== null) ?
                            (MasterGetter.getCurrentUser().role === 1 || MasterGetter.getCurrentUser().role === 4) ?
                            <div className={"create-new"}>
                                <button onClick={()=>this.toggleNewEvent()}>Vytvořit událost</button>
                            </div>
                                : ""
                        : ""}
                    </div>

                    {(this.state.newEvent) ? <NewEvent handler={this.toggleNewEvent}/> : null
                    }

                    {(events.count() === 0) ? "Žádné nadcházející události" :
                        <Grid className={"result-table"}>
                            <Row>
                                <Col xs={3}>Název</Col>
                                <Col xs={1}>Datum</Col>
                                <Col xs={1}>Čas</Col>
                                <Col xs={2}>Sál</Col>
                                <Col xs={1}>Cena</Col>
                                <Col xs={4}/>
                            </Row>
                            {events.toModelArray().map((event) => {

                                if(event.hall === null || event.act === null){
                                    return null;
                                }

                                if (moment(event.date)._d >= today) {
                                    if (parseInt(this.state.performanceType) === 0 || this.state.performanceType === event.act.type.id) {
                                        return (
                                            <Row>
                                                <Col xs={3} onClick={() => this.onEventClick(event)}>{event.act.name}</Col>
                                                <Col xs={1}
                                                     onClick={() => this.onEventClick(event)}>{moment(event.date).format("D. MMMM")}</Col>
                                                <Col xs={1}
                                                     onClick={() => this.onEventClick(event)}>{moment(event.date).format("HH:mm")}</Col>
                                                <Col xs={2} onClick={() => this.onEventClick(event)}>{event.hall.name}</Col>
                                                <Col xs={1}
                                                     onClick={() => this.onEventClick(event)}>{parseInt(event.price)} Kč</Col>
                                                <Col xs={4}>
                                                    <button onClick={()=>this.toggleReservationPopUp(event)}>Rezervovat vstupenky</button>
                                                    {(MasterGetter.getCurrentUser() !== null) ?
                                                        (MasterGetter.getCurrentUser().role === 1 || MasterGetter.getCurrentUser().role === 4) ?
                                                            <button onClick={() => {this.handleDeleteClick(event)}}>Zrušit</button>
                                                            : ""
                                                        : ""}
                                                </Col>
                                            </Row>
                                        );
                                    }
                                }
                            })}
                        </Grid>
                    }

                    {(this.state.showAct) ?
                        <ActView
                            event={this.state.event.id}
                            closePopup={this.toggleAct.bind(this)}
                        />
                        : null
                    }

                    {(this.state.showReservationPopUp) ?
                        <ReservationPopUp
                            event={this.state.event}
                            closePopup={this.toggleReservationPopUp.bind(this)}
                        />
                        : null
                    }
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Programme));