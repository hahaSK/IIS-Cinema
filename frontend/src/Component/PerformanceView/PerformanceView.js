import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player'
import "./PerformanceView.css";


export default class PerformanceView extends Component {


    render() {

        const event = this.props.event._fields;

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className={"header-and-close"}>
                        <h1>{event.name}&nbsp;<span>({event.country}, {event.year})</span></h1>
                        <FontAwesomeIcon className={"font-awesome-icon"} icon={faWindowClose} onClick={this.props.closePopup}/>
                    </div>
                    <div className={"film-description"} style={{display: 'flex'}}>
                        <div>
                            <Grid>
                                <Row>
                                    <img src={event.picture} alt={""}/>
                                </Row>
                                <br/>
                                <Row>
                                    <h3>Věková hranice:&nbsp;<span>{event.age_limit} let</span></h3>
                                </Row>
                                <Row>
                                    <h3>Znění:&nbsp;<span>{event.version}</span></h3>
                                </Row>
                                <Row>
                                    <h3>Žánr:&nbsp;<span>{event.genre}</span></h3>
                                </Row>
                                <Row>
                                    <h3>Délka:&nbsp;<span>{event.duration} minut</span></h3>
                                </Row>
                                <Row>
                                    <h3>Režie:&nbsp;<span>{event.director}</span></h3>
                                </Row>
                            </Grid>
                        </div>
                        <div>
                            <p>{event.description}</p>
                            <br/>
                            <div className={"player-and-schedule"}>
                                <div className={"player-wrapper"}>
                                    <ReactPlayer
                                        width="100%"
                                        url={event.ytb_url}/>
                                </div>
                                <div className={"schedule"}>
                                    <Grid>
                                        <Row>
                                            <Col xs={12}>
                                                <h2>Film hrajeme v následující dny</h2>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={3}>Pondělí</Col>
                                            <Col xs={3}>21. října</Col>
                                            <Col xs={3}>17:00</Col>
                                            <Col xs={3}>150 Kč</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={3}>Úterý</Col>
                                            <Col xs={3}>22. října</Col>
                                            <Col xs={3}>18:00</Col>
                                            <Col xs={3}>150 Kč</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={3}>Středa</Col>
                                            <Col xs={3}>23. října</Col>
                                            <Col xs={3}>17:00</Col>
                                            <Col xs={3}>150 Kč</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={3}>Středa</Col>
                                            <Col xs={3}>23. října</Col>
                                            <Col xs={3}>20:00</Col>
                                            <Col xs={3}>150 Kč</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={3}>Pondělí</Col>
                                            <Col xs={3}>28. října</Col>
                                            <Col xs={3}>17:00</Col>
                                            <Col xs={3}>150 Kč</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={3}>Úterý</Col>
                                            <Col xs={3}>29. října</Col>
                                            <Col xs={3}>18:00</Col>
                                            <Col xs={3}>150 Kč</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={3}>Středa</Col>
                                            <Col xs={3}>30. října</Col>
                                            <Col xs={3}>17:00</Col>
                                            <Col xs={3}>150 Kč</Col>
                                        </Row>
                                        <Row>
                                            <Col xs={3}>Středa</Col>
                                            <Col xs={3}>30. října</Col>
                                            <Col xs={3}>20:00</Col>
                                            <Col xs={3}>150 Kč</Col>
                                        </Row>
                                    </Grid>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}