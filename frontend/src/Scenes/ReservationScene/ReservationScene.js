import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './ReservationScene.css'
import Navigation from "../../Component/Navigation/Navigation";
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import orm from "../../Models/ORM/index";
import ReservationItem from "./ReservationItem";
import MasterGetter from "../../Models/Utils/MasterGetter";
import InstantAction from "../../Models/Utils/InstantAction";

class ReservationScene extends Component {

    constructor(props) {
        super(props);

        if (MasterGetter.getCurrentUser() === null)
            InstantAction.redirect("/");
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
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

    componentWillMount() {
        this.fetchActs();
        this.fetchEvents();
        this.fetchReservations();
    }

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const reservations = session.Reservation.all();

        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Rezervace</h1>
                </div>
                <hr />
                <div className={"body reservations"}>

                    {(reservations.count() === 0) ? "Žádné rezervace" :
                        <Grid className={"result-table"}>
                            <Row>
                                <Col xs={2}>E-mail</Col>
                                <Col xs={3}>Událost</Col>
                                <Col xs={2}>Datum a čas</Col>
                                <Col xs={2}>Počet sedadel</Col>
                                <Col xs={1}>Zaplaceno</Col>
                                <Col xs={2}/>
                            </Row>
                            {reservations.toModelArray().map((reservation) => {

                                console.log(reservation);

                                if(reservation.event === null || reservation.event.act === null){
                                    return null;
                                }

                                return (
                                    <ReservationItem reservation={reservation}/>
                                );
                            })}
                        </Grid>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(ReservationScene));