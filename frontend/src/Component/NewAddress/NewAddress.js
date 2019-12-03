import React, { Component } from "react";
import { Grid, Row, Col} from "react-flexbox-grid";
import "./NewAddress.css";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import BackendRequest from "../../Models/REST/BackendRequest";
import InstantAction from "../../Models/Utils/InstantAction";
import {ADD_ADDRESS} from "../../Models/Entities/Address";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";

class NewAddress extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            street2: "",
            house_number: "",
            city: "",
            psc: "",
            message: "",
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

    /**
     * Handle Submit
     * @param event
     */
    handleSubmit(event) {

        event.preventDefault();

        if (this.state.street2 === ""){
            this.setState({
                message: "Zadejte ulici."
            });
            return;
        }
        else if (this.state.house_number === ""){
            this.setState({
                message: "Zadejte číslo popisné."
            });
            return;
        }
        else if (this.state.city === ""){
            this.setState({
                message: "Zadejte město."
            });
            return;
        }
        else if (this.state.psc === ""){
            this.setState({
                message: "Zadejte PSČ."
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

            if (response.data.address !== undefined) {
                InstantAction.dispatch({
                    type: ADD_ADDRESS,
                    payload: response.data.address,
                });
            }
            MasterDispatcher.dispatch(response.data);
            this.props.handler();
            InstantAction.setToast("Adresa vytvořena");
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

        BackendRequest("post", "address", data, onSuccess, onError, onError );
    }

    render() {

        return (
            <div className={"new-address"}>
                <Grid>
                    <Row>
                        <Col xs={3}/>
                        <Col xs={3}>
                            <h3>Ulice:</h3>
                            <input type="text" name={"street2"} id={"street2"} value={this.state.street2} onChange={this.handleChange}/>
                        </Col>
                        <Col xs={2}>
                            <h3>Číslo popisné:</h3>
                            <input type="text" name={"house_number"} id={"house_number"} value={this.state.house_number} onChange={this.handleChange}/>
                        </Col>
                        <Col xs={3}>
                            <h3>Město:</h3>
                            <input type="text" name={"city"} id={"city"} value={this.state.city} onChange={this.handleChange}/>
                        </Col>
                        <Col xs={1}>
                            <h3>PSČ:</h3>
                            <input type="text" name={"psc"} id={"psc"} value={this.state.psc} onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}/>
                        <Col xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
                            <p style={{color: "red", margin: 0}}>{this.state.message}</p>
                            <button onClick={this.handleSubmit}>Vytvořit adresu</button>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(NewAddress));