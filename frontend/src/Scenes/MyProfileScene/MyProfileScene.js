import React, { Component } from 'react';
import {connect} from "react-redux";
import MasterGetter from "../../Models/Utils/MasterGetter";
import './MyProfileScene.css';
import Navigation from "../../Component/Navigation/Navigation";
import BackendRequest from "../../Models/REST/BackendRequest";
import InstantAction from "../../Models/Utils/InstantAction";
import {ADD_USER, UPDATE_USER} from "../../Models/Entities/User";
import {Col, Grid, Row} from "react-flexbox-grid";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import orm from "../../Models/ORM";
import moment from "moment/moment";

class MyProfileScene extends Component {

    constructor(props){
        super(props);

        const user = MasterGetter.getCurrentUser();

        this.state = {
            username: user.username,
            email: user.email,
            password: user.password,
            passwordAgain: "",
            firstName: user.first_name,
            lastName: user.last_name,
            passwordMessage: "",
            usermailMessage: "",
        };

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    passwordCheck = () => {

        if (this.state.password.localeCompare(this.state.passwordAgain) !== 0) {
            this.setState({
                passwordMessage: "Zadaná hesla se neshodují."
            });
            return;
        }
        else {
            this.setState({
                passwordMessage: ""
            });
        }

        /**
         * Function on success adding
         */
        const onSuccess = (response) => {

            console.log("WTF");
            InstantAction.setToast("Heslo úspěšně změněno");
            if (response.data !== undefined) {
                InstantAction.dispatch({
                    type: UPDATE_USER,
                    payload: response.data,
                });
            }
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
            password: this.state.password,
            password_again: this.state.passwordAgain
        };

        BackendRequest("put", "user/" + MasterGetter.getCurrentUser().id + "/password", data, onSuccess, onError, onError );

    };

    /**
     * Handle Submit
     * @param event
     */
    handleSubmit = () => {

        if (this.state.username === "" || this.state.email === "") {
            this.setState({
                usermailMessage: "Chybí uživatelské jméno či e-mail"
            });
            return;
        }
        else {
            this.setState({
                usermailMessage: ""
            });
        }

        /**
         * Function on success adding
         */
        const onSuccess = (response) => {

            if (response.data.user !== undefined) {
                InstantAction.dispatch({
                    type: UPDATE_USER,
                    payload: response.data.user,
                });
            }
            InstantAction.setToast("Profil upraven");
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
            username: this.state.username,
            email: this.state.email,
            first_name: this.state.firstName,
            last_name: this.state.lastName
        };

        BackendRequest("put", "user/" + MasterGetter.getCurrentUser().id, data, onSuccess, onError, onError );
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

    fetchReservations = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {
            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "reservations", null, onSuccess);
    };

    componentWillMount(){
        this.fetchReservations();
        this.fetchActs();
        this.fetchEvents();
    }

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const reservations = session.Reservation.all().filter((reservation) => reservation.user === MasterGetter.getCurrentUser().email);

        console.log(reservations);

        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Můj Profil</h1>
                </div>
                <hr />
                <div className={"body my-profile"}>
                    <Grid>
                        <Row>
                            <Col xs={6}>
                                <h2>Osobní údaje</h2>
                                <p style={{color: "red"}}>{this.state.usermailMessage}</p>
                                <div className={"form"}>
                                    <input type="text" defaultValue={this.state.username} name="username" onChange={this.handleChange} placeholder={"Uživatelské jméno"} />
                                    <input type="text" defaultValue={this.state.email} name="email" onChange={this.handleChange} placeholder={"E-mailová adresa"} />
                                    <input type="text" defaultValue={this.state.firstName} name="firstName" onChange={this.handleChange} placeholder={"Křestní jméno"} />
                                    <input type="text" defaultValue={this.state.lastName} name="lastName" onChange={this.handleChange} placeholder={"Příjmení"} />
                                </div>
                                <button onClick={this.handleSubmit}>Aktualizovat</button>
                            </Col>
                            <Col xs={6}>
                                <h2>Změna hesla</h2>
                                <p style={{color: "red"}}>{this.state.passwordMessage}</p>
                                <div className={"form"}>
                                    <input type="password" defaultValue={this.state.password} name="password" onChange={this.handleChange} placeholder={"Heslo"} />
                                    <input type="password" defaultValue={this.state.passwordAgain} name="passwordAgain" onChange={this.handleChange} placeholder={"Heslo znovu"} />
                                </div>
                                <button onClick={this.passwordCheck}>Změnit heslo</button>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <div className={"body"}>
                    <h2>Moje rezervace</h2>
                    {(reservations.count() === 0) ? "Dosud žádné rezervace" :
                        <Grid className={"result-table"}>
                            <Row>
                                <Col xs={3}>Událost</Col>
                                <Col xs={2}>Datum a čas</Col>
                                <Col xs={2}>Počet sedadel</Col>
                                <Col xs={1}>Zaplaceno</Col>
                                <Col xs={4}/>
                            </Row>
                            {reservations.toModelArray().map((reservation) => {

                                if(reservation.event === null || reservation.event.act === null){
                                    return null;
                                }

                                return (
                                    <Row>
                                        <Col xs={3}>{reservation.event.act.name}</Col>
                                        <Col xs={2}>{moment(reservation.event.date).format("D. MMMM")} {moment(reservation.event.date).format("HH:mm")}</Col>
                                        <Col xs={2}>{reservation._fields.seats.length}</Col>
                                        <Col xs={1}>
                                            {(reservation.paid === true) ? "Ano" : "Ne"}
                                        </Col>
                                        <Col xs={4}/>
                                    </Row>
                                );
                            })}
                    </Grid>
                }
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        entities: state.entities,
    });

export default connect(mapStateToProps)(MyProfileScene);