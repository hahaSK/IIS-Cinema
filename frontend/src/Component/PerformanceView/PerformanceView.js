import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import "./PerformanceView.css";
import orm from "../../Models/ORM";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import BackendRequest from "../../Models/REST/BackendRequest";
import moment from "moment/moment";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";


class PerformanceView extends Component {

    fetchEvents = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "events", null, onSuccess);
    };

    componentWillMount() {
        this.fetchEvents();
    }

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const event = session.Event.withId(this.props.event);
        console.log(event);

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className={"header-and-close"}>
                        <h1>{event._fields.act}</h1>
                        <FontAwesomeIcon className={"font-awesome-icon"} icon={faWindowClose} onClick={this.props.closePopup}/>
                    </div>
                    <div className={"film-description"} style={{display: 'flex'}}>
                        <div>
                            <Grid>
                                <Row>
                                    <h3>Cena:&nbsp;<span>{event.price}</span></h3>
                                </Row>
                                {/*<Row>*/}
                                    {/*<img src={event.picture} alt={""}/>*/}
                                {/*</Row>*/}
                                {/*<Row>*/}
                                    {/*<h3>Žánr:&nbsp;<span>{event.genre}</span></h3>*/}
                                {/*</Row>*/}
                                {/*<Row>*/}
                                    {/*<h3>Délka:&nbsp;<span>{event.length} minut</span></h3>*/}
                                {/*</Row>*/}
                                {/*<Row>*/}
                                    {/*<h3>Režie:&nbsp;<span>{event.director}</span></h3>*/}
                                {/*</Row>*/}
                            </Grid>
                        </div>
                        <div>
                            {/*<p>{event.description}</p>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/**
 * This function maps actions to props
 * and binds them so they can be called
 * directly.
 *
 * In this case all actions are mapped
 * to the `actions` prop.
 */
const mapDispatchToProps = dispatch => (
    {
        dispatch: (something) => {
            dispatch(something);
        }
    }
);

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
        entities: state.entities,
    });

/**
 * Exporting part of the React.Component file
 */
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(PerformanceView));