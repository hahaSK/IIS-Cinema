import React, { Component } from 'react';
// import { Grid, Row, Col } from 'react-flexbox-grid';
import './HallsScene.css';
import Navigation from "../../Component/Navigation/Navigation";

class Main extends Component {
    render() {

        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Sály</h1>
                </div>
                <hr />
                <div className={"body"}>

                </div>
            </div>
        );
    }
}

export default Main;