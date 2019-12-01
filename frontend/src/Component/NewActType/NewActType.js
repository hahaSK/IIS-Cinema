import React, { Component } from "react";
import { Grid, Row, Col} from "react-flexbox-grid";
import "./NewActType.css";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import BackendRequest from "../../Models/REST/BackendRequest";
import InstantAction from "../../Models/Utils/InstantAction";
import {ADD_ACTTYPE} from "../../Models/Entities/ActType";

class NewActType extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            name: "",
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

        /**
         * Function on success adding
         */
        const onSuccess = (response) => {

            if (response.data.acttype !== undefined) {
                InstantAction.dispatch({
                    type: ADD_ACTTYPE,
                    payload: response.data.acttype,
                });
            }
            this.props.handler();
            InstantAction.setToast("Typ představení vytvořen");
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

        BackendRequest("post", "acttypes", data, onSuccess, onError, onError );
    }

    render() {

        return (
            <div className={"new-act-type"}>
                <Grid>
                    <Row>
                        <Col xs={9}/>
                        <Col xs={3}>
                            <h3>Jméno:</h3>
                            <input type="text" name={"name"} id={"name"} value={this.state.name} onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}/>
                        <Col xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
                            <button onClick={this.handleSubmit}>Vytvořit typ</button>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(NewActType));