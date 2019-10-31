import React, { Component } from 'react';
import {connect} from "react-redux";
import { Grid, Row, Col } from 'react-flexbox-grid';
import MasterGetter from "../../Models/Utils/MasterGetter";
import './LoginScene.css';
import Navigation from "../../Component/Navigation/Navigation";

class LoginScene extends Component {

    state = {
        username: '',
        password: '',
        login: false,
        access: null
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
        });

        if (this.state.access === null) {
            this.setState({
                access: false,
            });
        }
    };

    render() {

        let response_message = null;

        if (this.state.access !== null) {
            if (this.state.access === true) {
                response_message = <h3>Jste přihlášen/a!</h3>
            }
            else {
                response_message = <h3>Chybně zadané údaje!</h3>
            }
        }

        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Přihlášení</h1>
                </div>
                <hr />
                <div className={"body login"}>
                    <div className={"login-box"}>
                        {response_message}
                        <input type="text" defaultValue={this.state.username} name="username" onChange={this.handleChange} placeholder={"Uživatelské jméno"} />
                        <input type="password" defaultValue={this.state.password} name="password" onChange={this.handleChange} placeholder={"Heslo"} />
                        <button onClick={this.tryToLogIn}>Přihlásit se</button>
                        <p>Nemáte-li účet, <a href={"/register"}>zaregistrujte se.</a></p>
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