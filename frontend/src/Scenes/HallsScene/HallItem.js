import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import "moment/min/locales";
import './HallsScene.css';
import InstantAction from "../../Models/Utils/InstantAction";
import {REMOVE_HALL, UPDATE_HALL} from "../../Models/Entities/Hall";
import orm from "../../Models/ORM/index";
import {UPDATE_USER} from "../../Models/Entities/User";

class HallItem extends Component {

    constructor(props){
        super(props);

        this.state = {
            name: this.props.hall.name,
            address: this.props.hall.address.id,
            rows: this.props.hall.rows,
            columns: this.props.hall.columns,
        }
    }

    /**
     * Handle Delete Click
     * @param event
     */
    handleDeleteClick = (deleteHall) => {

        /**
         * Delete event
         * @param response
         */
        const onSuccess = (response) => {

            InstantAction.dispatch({
                type: REMOVE_HALL,
                payload: deleteHall.id,
            });

            MasterDispatcher.dispatch(response.data);

            InstantAction.setToast("Sál odstraněn");
        };

        BackendRequest("delete", "hall/" + deleteHall.id, null, onSuccess);
    };

    handleInputChange = (event) => {

        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });

        this.forceUpdate();
    };

    handleSelectChange = (event) => {

        const { hall } = this.props;
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });

        if ( event !== null ) {
            event.preventDefault();
        }

        /**
         * On Error
         * @param response
         */
        const onError = (response) => {

            this.setState({
                error: response.status
            });

        };

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            const data = response.data;

            if (data.hall !== undefined) {
                InstantAction.dispatch({
                    type: UPDATE_HALL,
                    payload: data.hall,
                });
            }

            console.log(response.data);
            MasterDispatcher.dispatch(response.data);
            InstantAction.setToast("Sál upraven");
        };

        /**
         * Payload
         * @type {{role: string|string}}
         */
        const data = {
            [name]: value
        };

        BackendRequest("put", "hall/" + hall.id, data, onSuccess, onError);
    };

    handleSubmit = (event) => {

        const { hall } = this.props;

        if ( event !== null ) {
            event.preventDefault();
        }

        /**
         * On Error
         * @param response
         */
        const onError = (response) => {

            this.setState({
                error: response.status
            });

        };

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            const data = response.data;

            if (data.hall !== undefined) {
                InstantAction.dispatch({
                    type: UPDATE_HALL,
                    payload: data.hall,
                });
            }

            console.log(response.data);
            MasterDispatcher.dispatch(response.data);
            InstantAction.setToast("Sál upraven");
        };

        /**
         * Payload
         * @type {{role: string|string}}
         */
        const data = {
            ...this.state,
        };

        BackendRequest("put", "hall/" + hall.id, data, onSuccess, onError);
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

    componentWillMount() {
        this.fetchAdresses();
    }

    render() {

        const { entities, hall } = this.props;
        const session = orm.session(entities);
        const addresses = session.Address.all().toModelArray();

        return (
            <Row>
                <Col xs={2}>
                    <input type="text" name={"name"} id={"name"} value={hall.name} onChange={this.handleInputChange} onBlur={this.handleSubmit}/>
                </Col>
                <Col xs={3}>
                    <select
                        style={{width: "100%"}}
                        value={this.state.address}
                        onChange={this.handleSelectChange}
                        name={"address"}>
                        {addresses.map((address) => {
                            return <option key={address.id} value={address.id}>{address.street2}, {address.city} {address.psc}</option>;
                        })}
                    </select>
                </Col>
                <Col xs={2}>
                    <input type="text" name={"rows"} id={"rows"} value={this.state.rows} onChange={this.handleInputChange} onBlur={this.handleSubmit}/>
                </Col>
                <Col xs={2}>
                    <input type="text" name={"columns"} id={"columns"} value={this.state.columns} onChange={this.handleInputChange} onBlur={this.handleSubmit}/>
                </Col>
                <Col xs={3}>
                    <button onClick={() => {this.handleDeleteClick(hall)}}>Zrušit</button>
                </Col>
            </Row>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(HallItem));