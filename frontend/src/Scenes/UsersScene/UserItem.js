import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import "moment/min/locales";
import './UsersScene.css';
import InstantAction from "../../Models/Utils/InstantAction";
import {REMOVE_USER, UPDATE_USER} from "../../Models/Entities/User";

class UserItem extends Component {

    state = {
        role: 2
    };

    /**
     * Handle Delete Click
     * @param event
     */
    handleDeleteClick = (deleteUser) => {

        /**
         * Delete event
         * @param response
         */
        const onSuccess = (response) => {

            InstantAction.dispatch({
                type: REMOVE_USER,
                payload: deleteUser.id,
            });

            MasterDispatcher.dispatch(response.data);

            InstantAction.setToast("Uživatel odstraněn");
        };

        BackendRequest("delete", "user/" + deleteUser.id, null, onSuccess);
    };

    handleChange = (event) => {

        const { user } = this.props;
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });

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

            if (data.role !== undefined) {
                InstantAction.dispatch({
                    type: UPDATE_USER,
                    payload: data.role,
                });
            }

            MasterDispatcher.dispatch(response.data);
            InstantAction.setToast("Uživatel upraven");
        };

        /**
         * Payload
         * @type {{role: string|string}}
         */
        const data = {
            role: value
        };

        BackendRequest("put", "user/" + user.id, data, onSuccess, onError);
    };

    render() {

        const {user} = this.props;

        const userRoleTypes = [
            {name: "Administrátor", id: 1},
            {name: "Divák", id: 2},
            {name: "Pokladní", id: 3},
            {name: "Redaktor", id: 4},
        ];

        return (
            <Row>
                <Col xs={2}>{user.first_name}</Col>
                <Col xs={2}>{user.last_name}</Col>
                <Col xs={2}>{user.email}</Col>
                <Col xs={2}>
                    <select
                        style={{width: "100%"}}
                        value={user.role}
                        onChange={this.handleChange}
                        name={"role"}>
                        {userRoleTypes.map((roleType) => {
                            return <option key={roleType.id} value={roleType.id}>{roleType.name}</option>;
                        })}
                    </select>
                </Col>
                <Col xs={4}>
                    <button onClick={() => {this.handleDeleteClick(user)}}>Odstranit</button>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(UserItem));