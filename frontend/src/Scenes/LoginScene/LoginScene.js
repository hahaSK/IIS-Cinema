import React, { Component } from 'react';
import {connect} from "react-redux";
//import { Grid, Row, Col } from 'react-flexbox-grid';
import './LoginScene.css';
import Navigation from "../../Component/Navigation/Navigation";
import BackendRequest from "../../Models/REST/BackendRequest";
import InstantAction from "../../Models/Utils/InstantAction";
import {setAppLoaded, setLoggedUser} from "../../App/App.actions";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";

class LoginScene extends Component {

    state = {
        username: '',
        password: '',
        login: false,
        response_message: "",
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleLogin = () => {

        let onSuccess = (response) => {

            if (response.data.token !== undefined) {
                localStorage.setItem("JWT", response.data.token);
                InstantAction.dispatch(setLoggedUser(response.data.user.id));
                InstantAction.dispatch(setAppLoaded(true));
                MasterDispatcher.dispatch({user: response.data.user});
                InstantAction.redirect("/");
            }
        };

        let onActionError = (error) => {

            // Just local state
            this.setState({
                response_message: error.status,
            });

        };

        let onServerError = (error) => {

            this.setState({
                response_message: "Zadejte správné údaje."
            });
        };

        let data = {
            username: this.state.username,
            password: this.state.password,
        };

        BackendRequest("post", "login", data, onSuccess, onActionError, onServerError);
    };

    render() {

        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Přihlášení</h1>
                </div>
                <hr />
                <div className={"body login"}>
                    <div className={"login-box"}>
                        <p style={{color: "red"}}>{this.state.response_message}</p>
                        <input type="text" defaultValue={this.state.username} name="username" onChange={this.handleChange} placeholder={"Uživatelské jméno"} />
                        <input type="password" defaultValue={this.state.password} name="password" onChange={this.handleChange} placeholder={"Heslo"} />
                        <button onClick={this.handleLogin}>Přihlásit se</button>
                        <p>Nemáte-li účet, <a href={"/register"}>zaregistrujte se.</a></p>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        app: state.app,
        entities: state.entities,
    });

export default connect(mapStateToProps)(LoginScene);