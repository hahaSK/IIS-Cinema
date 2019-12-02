import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './Navigation.css'
import {connect} from "react-redux";
import InstantAction from "../../Models/Utils/InstantAction";
import MasterGetter from "../../Models/Utils/MasterGetter";

class Navigation extends Component {

    logOut = () => {
        localStorage.clear();
        InstantAction.resetStore();
    };

    render() {

        let routes;
        let user = MasterGetter.getCurrentUser();

        if (user === null) {
            routes =
                <ul>
                    <li>
                        <NavLink activeClassName="active" to="/programme">PROGRAM</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/login">PŘIHLÁSIT SE</NavLink>
                    </li>
                </ul>
        }
        // ADMIN
        else if (user.role === 1) {
            routes =
                <ul>
                    <li>
                        <NavLink activeClassName="active" to="/halls">SÁLY</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/acts">PŘEDSTAVENÍ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/users">UŽIVATELÉ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/reservations">REZERVACE</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/programme">PROGRAM</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/my_profile">MŮJ PROFIL</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" onClick={this.logOut} to="/login">ODHLÁSIT SE</NavLink>
                    </li>
                </ul>
        }
        // REDAKTOR
        else if (user.role === 4) {
            routes =
                <ul>
                    <li>
                        <NavLink activeClassName="active" to="/halls">SÁLY</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/acts">PŘEDSTAVENÍ</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/reservations">REZERVACE</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/programme">PROGRAM</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/my_profile">MŮJ PROFIL</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" onClick={this.logOut} to="/login">ODHLÁSIT SE</NavLink>
                    </li>
                </ul>
        }
        // POKLADNÍK
        else if (user.role === 3) {
            routes =
                <ul>
                    <li>
                        <NavLink activeClassName="active" to="/reservations">REZERVACE</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/programme">PROGRAM</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/my_profile">MŮJ PROFIL</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" onClick={this.logOut} to="/login">ODHLÁSIT SE</NavLink>
                    </li>
                </ul>
        }
        // POKLADNÍK
        else if (user.role === 2) {
            routes =
                <ul>
                    <li>
                        <NavLink activeClassName="active" to="/programme">PROGRAM</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/my_profile">MŮJ PROFIL</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" onClick={this.logOut} to="/login">ODHLÁSIT SE</NavLink>
                    </li>
                </ul>
        }

        return (
            <div className={"navigation"}>
                <div className={"menu"}>
                    <ul>
                        <li className={"main-icon"} style={{'padding': '0'}}>
                            <NavLink activeClassName="active" to="/">
                                <div style={{'width': '10rem', 'height': 'fit-content', 'textAlign': 'center'}}>
                                    <h1 style={{'margin': '0', 'marginBottom': '-0.75rem'}}>Kino</h1>
                                    <h3 style={{'margin': '0'}}>u 3 přátel</h3>
                                </div>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                 <div className={"menu"}>
                     {routes}
                </div>
            </div>
        );
    }
}

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
        browser: state.browser,
    });

/**
 * Exporting part of the React.Component file
 */
export default connect(mapStateToProps)(Navigation);