import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './ProgrammeScene.css'
import Navigation from "../../Component/Navigation/Navigation";
import MasterGetter from "../../Models/Utils/MasterGetter";
import PerformanceView from "../../Component/PerformanceView/PerformanceView";
import PerformanceForm from "../../Component/PerformanceForm/PerformanceForm";
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import orm from "../../Models/ORM/index";
import moment from "moment";
import "moment/min/locales";
import NewEvent from "../../Component/NewEvent/NewEvent";

class Programme extends Component {

    state = {
        event: "",
        showEvent: false,
        showPerformanceForm: false,
        newEvent: false,
        performanceType: 0,
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
            /**
             * Dispatch All
             */
            MasterDispatcher.dispatch(response.data);
            window.location = "/";
        };

        BackendRequest("delete", "event/" + deleteEvent.id, null, onSuccess);
    };

    onEventClick = (eventId) => {
        this.setState({
            event: eventId
        });
        console.log(this.state.event);
        this.toggleEvent();
    };

    toggleEvent = () => {
        this.setState({
            showEvent: !this.state.showEvent
        });
    };

    togglePerformanceForm = () => {
        this.setState({
            showPerformanceForm: !this.state.showPerformanceForm
        });
    };

    toggleNewEvent = () => {
        this.setState({
            newEvent: !this.state.newEvent
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

        BackendRequest("get", "act-types", null, onSuccess);
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
                        <div className={"create-new"}>
                            <button onClick={()=>this.togglePerformanceForm()}>Vytvořit představení</button>
                            <button onClick={()=>this.toggleNewEvent()}>Vytvořit událost</button>
                        </div>
                    </div>

                    {(this.state.newEvent) ? <NewEvent/> : null
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
                                if (moment(event.date)._d >= today) {
                                    if (this.state.performanceType === 0) { //TODO: || this.state.performanceType === event.type
                                        return (
                                            <Row>
                                                <Col xs={3} onClick={() => this.onEventClick(event.id)}>Název</Col>
                                                <Col xs={1}
                                                     onClick={() => this.onEventClick(event.id)}>{moment(event.date).format("D. MMMM")}</Col>
                                                <Col xs={1}
                                                     onClick={() => this.onEventClick(event.id)}>{moment(event.date).format("HH:mm")}</Col>
                                                <Col xs={2} onClick={() => this.onEventClick(event)}>Sál</Col>
                                                <Col xs={1}
                                                     onClick={() => this.onEventClick(event.id)}>{parseInt(event.price)} Kč</Col>
                                                <Col xs={4}>
                                                    <button onClick={() => {alert("Vstupenky")}}>Koupit vstupenky</button>
                                                    <button onClick={() => {alert("Editovat")}}>Editovat</button>
                                                    <button onClick={() => {this.handleDeleteClick(event)}}>Zrušit</button>
                                                </Col>
                                            </Row>
                                        );
                                    }
                                }
                            })}
                        </Grid>
                    }

                    {(this.state.showEvent) ?
                        <PerformanceView
                            event={this.state.event}
                            closePopup={this.toggleEvent.bind(this)}
                        />
                        : null
                    }

                    {(this.state.showPerformanceForm) ?
                        <PerformanceForm
                            event={this.state.event}
                            closePopup={this.togglePerformanceForm.bind(this)}
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