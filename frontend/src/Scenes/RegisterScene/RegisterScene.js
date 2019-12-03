import React, { Component } from 'react';
import {connect} from "react-redux";
import MasterGetter from "../../Models/Utils/MasterGetter";
import './RegisterScene.css';
import Navigation from "../../Component/Navigation/Navigation";
import BackendRequest from "../../Models/REST/BackendRequest";
import {ADD_HALL} from "../../Models/Entities/Hall";
import InstantAction from "../../Models/Utils/InstantAction";
import {ADD_USER} from "../../Models/Entities/User";

class RegisterScene extends Component {

    state = {
        username: "",
        email: "",
        password: "",
        passwordSecond: "",
        responseMessage: "",
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    passwordCheck = () => {
        if (this.state.password.localeCompare(this.state.passwordSecond) !== 0)
            this.setState({
               responseMessage: "Zadaná hesla se neshodují."
            });
        else {
            this.setState({
                responseMessage: ""
            });
            this.handleSubmit();
        }
    };

    /**
     * Handle Submit
     * @param event
     */
    handleSubmit = () => {

        if (this.state.username === ""){
            this.setState({
                responseMessage: "Zadejte uživatelské jméno."
            });
            return;
        }
        else if (this.state.email === ""){
            this.setState({
                responseMessage: "Zadejte email."
            });
            return;
        }
        else if (this.state.password === ""){
            this.setState({
                responseMessage: "Zadejte heslo."
            });
            return;
        }
        else {
            this.setState({
                responseMessage: ""
            })
        }


        /**
         * Function on success adding
         */
        const onSuccess = (response) => {

            if (response.data.user !== undefined) {
                InstantAction.dispatch({
                    type: ADD_USER,
                    payload: response.data.user,
                });
            }
            InstantAction.redirect("/login");
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
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        };

        BackendRequest("post", "user/create", data, onSuccess, onError, onError );
    };

    render() {
        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Registrace</h1>
                </div>
                <hr />
                <div className={"body register"}>
                    <div className={"register-box"}>
                        <p style={{color: "red"}}>{this.state.responseMessage}</p>
                        <input type="text" defaultValue={this.state.username} name="username" onChange={this.handleChange} placeholder={"Uživatelské jméno"} />
                        <input type="text" defaultValue={this.state.email} name="email" onChange={this.handleChange} placeholder={"E-mailová adresa"} />
                        <input type="password" defaultValue={this.state.password} name="password" onChange={this.handleChange} placeholder={"Heslo"} />
                        <input type="password" defaultValue={this.state.passwordSecond} name="passwordSecond" onChange={this.handleChange} placeholder={"Heslo znovu"} />
                        <button onClick={this.passwordCheck}>Registrovat se</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => (
    {
        entities: state.entities,
    });

export default connect(mapStateToProps)(RegisterScene);