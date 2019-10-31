import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import "./ReservationPopUp.css";


export default class ReservationPopUp extends Component {

    createTable = () => {
        let table = [];

        // Outer loop to create parent
        for (let i = 0; i < 12; i++) {
            let children = [];
            //Inner loop to create children
            for (let j = 0; j < 24; j++) {
                children.push(<Col xs={0.5}>&nbsp;</Col>)
            }
            //Create the parent and add the children
            table.push(<Row>{children}</Row>)
        }
        return table;
    };

    render() {

        const event = this.props.event._fields;

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className={"header-and-close"}>
                        <h1>{event.name}&nbsp;<span>({event.country}, {event.year})</span></h1>
                        <FontAwesomeIcon className={"font-awesome-icon"} icon={faWindowClose} onClick={this.props.closePopup}/>
                    </div>
                    <div className={"schema-and-stats"}>
                        <div className={"stats"}>
                            <h3>Celková kapacita: <span>{12*24}</span></h3>
                            <h3>Počet volných míst: <span>{12*24}</span></h3>
                            <h3>Počet zvolených míst: <span>{0}</span></h3>
                        </div>
                        <div className={"schema"}>
                            <Grid>
                                <Row>
                                    <Col xs={12}>Plátno</Col>
                                </Row>
                                <br/>
                                {this.createTable()}
                            </Grid>
                        </div>
                    </div>
                    <div className={"continue-button"}>
                        <button>Pokračovat</button>
                    </div>
                </div>
            </div>
        );
    }
}