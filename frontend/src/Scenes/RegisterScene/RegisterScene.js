import React, { Component } from 'react';
import {connect} from "react-redux";
import MasterGetter from "../../Models/Utils/MasterGetter";
import './RegisterScene.css';
import Navigation from "../../Component/Navigation/Navigation";

class LoginScene extends Component {

    state = {
        username: '',
        first_name: '',
        surname: '',
        email: '',
        password: '',
        password_second: '',
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    tryToLogIn = () => {
        const {entities} = this.props;
        const session = MasterGetter.getSession(entities);
        const users = session.User.all();

        users.toModelArray().map(user => {
            if (user.username === this.state.username) {
                if (user._fields.password === this.state.password) {
                    this.setState({
                        access: true,
                    });
                }
            }
            return "";
        });

        if (this.state.access === null) {
            this.setState({
                access: false,
            });
        }
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
                        <input type="text" defaultValue={this.state.username} name="username" onChange={this.handleChange} placeholder={"Uživatelské jméno"} />
                        <input type="text" defaultValue={this.state.first_name} name="first_name" onChange={this.handleChange} placeholder={"Křestní jméno"} />
                        <input type="text" defaultValue={this.state.surname} name="surname" onChange={this.handleChange} placeholder={"Příjmení"} />
                        <input type="text" defaultValue={this.state.email} name="email" onChange={this.handleChange} placeholder={"E-mailová adresa"} />
                        <input type="password" defaultValue={this.state.password} name="password" onChange={this.handleChange} placeholder={"Heslo"} />
                        <input type="password" defaultValue={this.state.password_second} name="password_second" onChange={this.handleChange} placeholder={"Heslo znovu"} />
                        <button onClick={this.tryToLogIn}>Registrovat se</button>
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

export default connect(mapStateToProps)(LoginScene);