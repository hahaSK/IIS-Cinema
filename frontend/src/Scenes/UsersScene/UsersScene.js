import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Navigation from "../../Component/Navigation/Navigation";
import MasterGetter from "../../Models/Utils/MasterGetter";
import PerformanceView from "../../Component/PerformanceView/PerformanceView";
import PerformanceForm from "../../Component/PerformanceForm/PerformanceForm";
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import orm from "../../Models/ORM/index";
import moment from "moment";
import "moment/min/locales";

class Users extends Component {

    state = {
        userRole: ""
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

            console.log("Users");
            console.log(response.data);
            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "users", null, onSuccess);
    };

    componentDidMount() {
        this.fetchUsers();
    }

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const users = session.User.all();


        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Program</h1>
                </div>
                <hr />
                <div className={"body users"}>
                    {/*<div className={"top-line"}>*/}
                        {/*<div className={"filter-users"}>*/}
                            {/*<h3 style={{margin: '0'}}>Typ uživatele:</h3>*/}
                            {/*<select name={"userRole"} onChange={this.handleChange} value={this.state.userRole}>*/}
                                {/*<option disabled>Zvolte typ uživatele</option>*/}
                                {/*<option key={0} defaultValue={"all"}>Všechny</option>*/}
                                {/*{userRoles.toModelArray().map(userRole => {*/}
                                    {/*return <option key={userRole.id} value={userRole.name}>{userRole.name}</option>;*/}
                                {/*})}*/}
                            {/*</select>*/}
                        {/*</div>*/}
                    {/*</div>*/}

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
                            return (
                                <Row>
                                    <Col xs={2}>{user.first_name}</Col>
                                    <Col xs={2}>{user.surname}</Col>
                                    <Col xs={2}>{user.mail}</Col>
                                    <Col xs={2}>{user.role}</Col>
                                    <Col xs={4}>
                                        <button onClick={() => {alert("Vstupenky")}}>Odstranit</button>
                                    </Col>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(Users));