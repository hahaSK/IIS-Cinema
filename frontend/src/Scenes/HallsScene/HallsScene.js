import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './HallsScene.css'
import Navigation from "../../Component/Navigation/Navigation";
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import orm from "../../Models/ORM/index";
import "moment/min/locales";
import NewHall from "../../Component/NewHall/NewHall";
import NewAddress from "../../Component/NewAddress/NewAddress";
import {REMOVE_EVENT} from "../../Models/Entities/Event";
import InstantAction from "../../Models/Utils/InstantAction";
import {REMOVE_HALL} from "../../Models/Entities/Hall";
import HallItem from "./HallItem";

class HallsScene extends Component {

    state = {
        newAddress: false,
        newHall: false,
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
     * @param deleteAct
     */
    handleDeleteClick = (deleteHall) => {

        /**
         * Delete act
         * @param response
         */
        const onSuccess = (response) => {

            InstantAction.dispatch({
                type: REMOVE_HALL,
                payload: deleteHall.id,
            });

            MasterDispatcher.dispatch(response.data);

            InstantAction.setToast("Sál zrušen");
        };

        BackendRequest("delete", "hall/" + deleteHall.id, null, onSuccess);
    };

    toggleNewHall = () => {
        this.setState({
            newHall: !this.state.newHall,
            newAddress: false,
        });
    };

    toggleNewAddress = () => {
        this.setState({
            newAddress: !this.state.newAddress,
            newHall: false,
        });
    };

    fetchAdresses = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "addresses", null, onSuccess);
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
        this.fetchHalls();
        this.fetchAdresses();
    }

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const halls = session.Hall.all().orderBy("name");

        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Sály</h1>
                </div>
                <hr />
                <div className={"body halls"}>
                    <div className={"top-line"}>
                        <div></div>
                        <div className={"create-new"}>
                            <button onClick={()=>this.toggleNewHall()}>Přidat sál</button>
                            <button onClick={()=>this.toggleNewAddress()}>Přidat adresu</button>
                        </div>
                    </div>

                    {(this.state.newHall) ? <NewHall handler={this.toggleNewHall}/> : null}
                    {(this.state.newAddress) ? <NewAddress handler={this.toggleNewAddress}/> : null}

                    {(halls.count() === 0) ? "Žádné sály" :
                        <Grid className={"result-table"}>
                            <Row>
                                <Col xs={2}>Název</Col>
                                <Col xs={3}>Adresa</Col>
                                <Col xs={2}>Počet řad</Col>
                                <Col xs={2}>Počet sloupců</Col>
                                <Col xs={3}/>
                            </Row>
                            {halls.toModelArray().map((hall) => {

                                if(hall.address === null){
                                    return null;
                                }

                                console.log(hall.address);

                                return (
                                    <HallItem hall={hall}/>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(HallsScene));