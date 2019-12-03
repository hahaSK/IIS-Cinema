import React, { Component } from "react";
import { Grid, Row, Col} from "react-flexbox-grid";
import "./NewHall.css";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import BackendRequest from "../../Models/REST/BackendRequest";
import InstantAction from "../../Models/Utils/InstantAction";
import {ADD_HALL} from "../../Models/Entities/Hall";
import orm from "../../Models/ORM";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import MasterGetter from "../../Models/Utils/MasterGetter";

class NewHall extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            address: 0,
            rows: 0,
            columns: 0,
            message: "",
            user: MasterGetter.getCurrentUser()
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

        if (this.state.name === ""){
            this.setState({
                message: "Zadejte název."
            });
            return;
        }
        else if (this.state.address === 0){
            this.setState({
                message: "Vyberte adresu."
            });
            return;
        }
        else if (this.state.rows === 0){
            this.setState({
                message: "Zadejte počet řad."
            });
            return;
        }
        else if (this.state.columns === 0){
            this.setState({
                message: "Zadejte počet sedadel v řadě."
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

            if (response.data.hall !== undefined) {
                InstantAction.dispatch({
                    type: ADD_HALL,
                    payload: response.data.hall,
                });
            }
            MasterDispatcher.dispatch(response.data);
            this.props.handler();
            InstantAction.setToast("Sál vytvořen");
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

        BackendRequest("post", "hall", data, onSuccess, onError, onError );
    }

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const addresses = session.Address.all();

        return (
            <div className={"new-hall"}>
                <Grid>
                    <Row>
                        <Col xs={3}/>
                        <Col xs={2}>
                            <h3>Název:</h3>
                            <input type="text" name={"name"} id={"name"} value={this.state.name} onChange={this.handleChange}/>
                        </Col>
                        <Col xs={3}>
                            <h3>Adresa:</h3>
                            <select name={"address"} onChange={this.handleChange} value={this.state.address}>
                                <option value={0} disabled>Zvolte adresu</option>
                                {addresses.toModelArray().map(address => {
                                    return <option key={address.id} value={address.id}>{address.street2}, {address.city} {address.psc}</option>;
                                })}
                            </select>
                        </Col>
                        <Col xs={2}>
                            <h3>Počet řad:</h3>
                            <input type="text" name={"rows"} id={"rows"} value={this.state.rows} onChange={this.handleChange}/>
                        </Col>
                        <Col xs={2}>
                            <h3>Počet sloupců:</h3>
                            <input type="text" name={"columns"} id={"columns"} value={this.state.columns} onChange={this.handleChange}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}/>
                        <Col xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
                            <p style={{color: "red", margin: 0}}>{this.state.message}</p>
                            <button onClick={this.handleSubmit}>Vytvořit sál</button>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(NewHall));