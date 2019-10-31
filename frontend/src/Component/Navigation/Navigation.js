import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import './Navigation.css'
import {connect} from "react-redux";

class Navigation extends Component {

    render() {

        let style = {borderBottom: '1px solid #09d3ac'};

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
                    <ul>
                        {(window.location.pathname === "/programme") ?
                            <li style={style}>
                                <NavLink activeClassName="active" to="/programme">PROGRAM</NavLink>
                            </li>
                            : <li>
                                <NavLink activeClassName="active" to="/programme">PROGRAM</NavLink>
                            </li>
                        }
                        {(window.location.pathname === "/halls") ?
                            <li style={style}>
                                <NavLink activeClassName="active" to="/halls">SÁLY</NavLink>
                            </li>
                            : <li>
                                <NavLink activeClassName="active" to="/halls">SÁLY</NavLink>
                            </li>
                        }
                        {(window.location.pathname === "/users") ?
                            <li style={style}>
                                <NavLink activeClassName="active" to="/users">UŽIVATELÉ</NavLink>
                            </li>
                            : <li>
                                <NavLink activeClassName="active" to="/users">UŽIVATELÉ</NavLink>
                            </li>
                        }
                        {(window.location.pathname === "/reservations") ?
                            <li style={style}>
                                <NavLink activeClassName="active" to="/reservations">REZERVACE</NavLink>
                            </li>
                            : <li>
                                <NavLink activeClassName="active" to="/reservations">REZERVACE</NavLink>
                            </li>
                        }
                        {(window.location.pathname === "/login") ?
                            <li style={style}>
                                <NavLink activeClassName="active" to="/login">PŘIHLÁSIT SE</NavLink>
                            </li>
                            : <li>
                                <NavLink activeClassName="active" to="/login">PŘIHLÁSIT SE</NavLink>
                            </li>
                        }
                    </ul>
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