import React, { Component } from "react";
import { Grid, Row, Col} from "react-flexbox-grid";
import "./NewEvent.css";
import orm from "../../Models/ORM";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import InstantAction from "../../Models/Utils/InstantAction";
import {ADD_EVENT} from "../../Models/Entities/Event";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class NewEvent extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            act: 0,
            price: "",
            date: new Date(),
            hall: 0,
            message: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

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

    handleDateChange =date => {
        this.setState({
            date
        });
        console.log(`Date:`, date);
    };

    /**
     * Handle Submit
     * @param event
     */
    handleSubmit(event) {

        event.preventDefault();

        if (this.state.act === 0){
            this.setState({
                message: "Vyberte představení."
            });
            return;
        }
        else if (this.state.hall === 0){
            this.setState({
                message: "Vyberte sál."
            });
            return;
        }
        else if (this.state.price === ""){
            this.setState({
                message: "Zadejte cenu."
            });
            return;
        }
        else {
            this.setState({
                message: ""
            })
        }

        /**
         * Function on success adding
         */
        const onSuccess = (response) => {

            if (response.data.event !== undefined) {
                InstantAction.dispatch({
                    type: ADD_EVENT,
                    payload: response.data.event,
                });
            }
            MasterDispatcher.dispatch(response.data);
            this.props.handler();
            InstantAction.setToast("Událost vytvořena");
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
            ...this.state
        };

        BackendRequest("post", "event", data, onSuccess, onError, onError );
    }

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

    componentWillMount = () => {
        this.fetchHalls();
        this.fetchActs();
    };

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const acts = session.Act.all();
        const halls = session.Hall.all();

        return (
            <div className={"new-event"}>
                <Grid>
                    <Row>
                        <Col xs={4}/>
                        <Col xs={3}>
                            <h3>Představení:</h3>
                            <select name={"act"} onChange={this.handleChange} value={this.state.act}>
                                <option value={0} disabled>Zvolte představení</option>
                                {acts.toModelArray().map(act => {
                                    return <option key={act.id} value={act.id}>{act.name}</option>;
                                })}
                            </select>
                        </Col>
                        <Col xs={2}>
                            <h3>Datum a čas:</h3>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.handleDateChange}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                timeCaption="time"
                                dateFormat="dd.MM.yyyy, HH:mm"
                            />
                        </Col>
                        <Col xs={2}>
                            <h3>Sál:</h3>
                            <select name={"hall"} onChange={this.handleChange} value={this.state.hall}>
                                <option value={0} disabled>Zvolte sál</option>
                                {halls.toModelArray().map(hall => {
                                    return <option key={hall.id} value={hall.id}>{hall.name}</option>;
                                })}
                            </select>
                        </Col>
                        <Col xs={1}>
                            <h3>Cena:</h3>
                            <input type="text" name={"price"} id={"price"} value={this.state.price} onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}/>
                        <Col xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
                            <p style={{color: "red", margin: 0}}>{this.state.message}</p>
                            <button onClick={this.handleSubmit}>Vytvořit</button>
                        </Col>
                    </Row>
                </Grid>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(NewEvent));