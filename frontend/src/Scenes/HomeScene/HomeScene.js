import React, { Component } from 'react';
// import { Grid, Row, Col } from 'react-flexbox-grid';
import './HomeScene.css';
import Navigation from "../../Component/Navigation/Navigation";

class Main extends Component {
    render() {

        return (
            <div className="App">
                <Navigation/>
                <hr />
                <div className={"body"}>

                </div>
            </div>
        );
    }
}

export default Main;