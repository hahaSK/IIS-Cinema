import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Navigation from "../../Component/Navigation/Navigation";
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import orm from "../../Models/ORM/index";
import "moment/min/locales";
import './UsersScene.css';
import {REMOVE_HALL} from "../../Models/Entities/Hall";
import InstantAction from "../../Models/Utils/InstantAction";
import {REMOVE_USER} from "../../Models/Entities/User";
import UserItem from "./UserItem";
import MasterGetter from "../../Models/Utils/MasterGetter";

class UsersScene extends Component {

    constructor(props) {
        super(props);

        this.state = {
            role: 0
        };

        if (MasterGetter.getCurrentUser() === null)
            InstantAction.redirect("/");
        else if (MasterGetter.getCurrentUser().role === 2)
            InstantAction.redirect("/");
        else if (MasterGetter.getCurrentUser().role === 3)
            InstantAction.redirect("/");
        else if (MasterGetter.getCurrentUser().role === 4)
            InstantAction.redirect("/");
    }

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
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    fetchUsers = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "users", null, onSuccess);
    };

    componentWillMount() {
        this.fetchUsers();
    };

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const users = session.User.all().orderBy("last_name");

        // const userRoleTypes = [
        //     {name: "Administrátor", id: 1},
        //     {name: "Divák", id: 2},
        //     {name: "Pokladní", id: 3},
        //     {name: "Redaktor", id: 4},
        // ];

        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Uživatelé</h1>
                </div>
                <hr />
                <div className={"body users"}>
                    <div className={"top-line"}>
                        <div className={"filter-users"}>
                            <h3 style={{margin: '0'}}>Typ uživatele:</h3>
                            <select name="role" onChange={this.handleChange} value={this.state.role}>
                                <option disabled>Zvolte typ uživatele</option>
                                <option key={0} defaultValue={0} value={0}>Všechny</option>
                                <option key={1} value={1}>Admin</option>
                                <option key={2} value={2}>Divák</option>
                                <option key={3} value={3}>Pokladní</option>
                                <option key={4} value={4}>Redaktor</option>
                            </select>
                        </div>
                    </div>

                    {(users.count() === 0) ? "Žádní uživatelé" :
                        <Grid className={"result-table"}>
                            <Row>
                                <Col xs={2}>Jméno</Col>
                                <Col xs={2}>Příjmení</Col>
                                <Col xs={2}>E-mail</Col>
                                <Col xs={2}>Role</Col>
                                <Col xs={4}/>
                            </Row>
                            {users.toModelArray().map((user) => {
                                console.log(this.state.role);
                                if (parseInt(this.state.role) === 0 || parseInt(this.state.role) === parseInt(user.role)) {
                                    return (
                                        <UserItem user={user}/>
                                    );
                                }
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(UsersScene));