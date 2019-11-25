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

class Programme extends Component {

    state = {
        event: null,
        showEvent: false,
        showPerformanceForm: false,
        performanceType: "",
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    onEventClick = (event) => {
        this.setState({
            event: event
        });
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

            console.log("Events");
            console.log(response.data);
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

    componentDidMount() {
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
                                <option key={0} defaultValue={"all"}>Všechny</option>
                                {actTypes.toModelArray().map(actType => {
                                    return <option key={actType.id} value={actType.name}>{actType.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className={"create-new"}>
                            <button onClick={()=>this.togglePerformanceForm()}>Vytvořit představení</button>
                            <button>Vytvořit událost</button>
                        </div>
                    </div>

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
                            let act = session.Act.withId(event._fields.act);
                            let hall = session.Hall.withId(event._fields.hall);
                            console.log("names");
                            console.log(act);
                            console.log(hall);
                            if (moment(event.date)._d >= today) {
                                return (
                                    <Row>
                                        <Col xs={3} onClick={() => this.onEventClick(event)}>{event._fields.act}</Col>
                                        <Col xs={1}
                                             onClick={() => this.onEventClick(event)}>{moment(event.date).format("D. MMMM")}</Col>
                                        <Col xs={1}
                                             onClick={() => this.onEventClick(event)}>{moment(event.date).format("HH:mm")}</Col>
                                        <Col xs={2} onClick={() => this.onEventClick(event)}>{event._fields.hall}</Col>
                                        <Col xs={1}
                                             onClick={() => this.onEventClick(event)}>{parseInt(event.price)} Kč</Col>
                                        <Col xs={4}>
                                            <button onClick={() => {
                                                alert("Vstupenky")
                                            }}>Koupit vstupenky
                                            </button>
                                            <button onClick={() => {
                                                alert("Editovat")
                                            }}>Editovat
                                            </button>
                                            <button onClick={() => {
                                                alert("Zrušit")
                                            }}>Zrušit
                                            </button>
                                        </Col>
                                    </Row>
                                );
                            }
                        })}
                        </Grid>
                    }

                    {/*<Grid className={"result-table"}>*/}

                    {/*{nextMonth.map(weekday => {*/}
                        {/*dayEventList = [];*/}
                        {/*i = 0;*/}
                        {/*return (*/}
                            {/*<div>*/}
                                {/*{events.toModelArray().map(event => {*/}
                                    {/*if (weekday.getDate() === event._fields.date.getDate() && weekday.getMonth() === event._fields.date.getMonth() && weekday.getFullYear() === event._fields.date.getFullYear()){*/}
                                        {/*dayEventList.push(event);*/}
                                        {/*return "";*/}
                                    {/*}*/}
                                {/*})}*/}
                                {/*{dayEventList.map(dayEvent => {*/}
                                    {/*if(dayEventList.length !== 0) {*/}
                                        {/*i++;*/}
                                        {/*return (*/}
                                            {/*<div>*/}
                                                {/*{(i === 1) ?*/}
                                                    {/*<span>*/}
                                                    {/*<h1>{this.DayAsString(weekday.getDay()) + ", " + weekday.getDate() + ". " + this.MonthAsString(weekday.getMonth())}</h1>*/}
                                                    {/*<hr/>*/}
                                                    {/*</span>*/}
                                                    {/*: ""}*/}
                                                {/*<Row>*/}
                                                    {/*<Col xs={2} onClick={()=>this.onEventClick(dayEvent)}>{dayEvent.type}</Col>*/}
                                                    {/*<Col xs={4} onClick={()=>this.onEventClick(dayEvent)}>{dayEvent.name}</Col>*/}
                                                    {/*<Col xs={1} onClick={()=>this.onEventClick(dayEvent)}>{dayEvent.time}</Col>*/}
                                                    {/*<Col xs={5}>*/}
                                                        {/*<button onClick={()=> {alert("Vstupenky")}}>Koupit vstupenky</button>*/}
                                                        {/*<button onClick={()=> {alert("Editovat")}}>Editovat</button>*/}
                                                        {/*<button onClick={()=> {alert("Zrušit")}}>Zrušit</button>*/}
                                                    {/*</Col>*/}
                                                {/*</Row>*/}
                                            {/*</div>*/}
                                        {/*);*/}
                                    {/*}*/}
                                    {/*else {*/}
                                        {/*return "";*/}
                                    {/*}*/}
                                {/*})}*/}
                            {/*</div>*/}
                        {/*);*/}
                    {/*})}*/}
                    {/*</Grid>*/}

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