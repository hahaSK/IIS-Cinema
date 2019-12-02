import React, { Component } from "react";
import { Grid, Row} from "react-flexbox-grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import "./PerformanceView.css";
import orm from "../../Models/ORM";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";


class PerformanceView extends Component {

    fetchGenres = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "genres", null, onSuccess);
    };

    fetchActors = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "actors", null, onSuccess);
    };

    fetchDirectors = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "directors", null, onSuccess);
    };

    componentWillMount() {
        this.fetchGenres();
        this.fetchActors();
        this.fetchDirectors();
    }

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const event = session.Event.withId(this.props.event);

        let genresString = "";
        let castString = "";
        let directorsString = "";

        for (let i = 0; i < event.act._fields.genre.length; i++) {

            if(session.Genre.withId(event.act._fields.genre[i]) === null){
                return null;
            }

            let genre = session.Genre.withId(event.act._fields.genre[i]);

            if (genre.name === null || genre.name === undefined)
                return null;

            if (i !== 0)
                genresString = genresString + ", ";

            genresString = genresString + genre.name;
        }

        for (let i = 0; i < event.act._fields.cast.length; i++) {

            if(session.Actor.withId(event.act._fields.cast[i]) === null){
                return null;
            }

            let cast = session.Actor.withId(event.act._fields.cast[i]);

            if (cast.name === null || cast.name === undefined)
                return null;

            if (i !== 0)
                castString = castString + ", ";

            castString = castString + cast.name;
        }

        for (let i = 0; i < event.act._fields.director.length; i++) {

            if(session.Director.withId(event.act._fields.director[i]) === null){
                return null;
            }

            let director = session.Director.withId(event.act._fields.director[i]);

            if (director.name === null || director.name === undefined)
                return null;

            if (i !== 0)
                directorsString = directorsString + ", ";

            directorsString = directorsString + director.name;
        }

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className={"header-and-close"}>
                        <h1>{event.act.name} <span>({parseInt((event.act.rating))} %)</span></h1>
                        <FontAwesomeIcon className={"font-awesome-icon"} icon={faWindowClose} onClick={this.props.closePopup}/>
                    </div>
                    <div className={"film-description"} style={{display: 'flex'}}>
                        <div>
                            <Grid>
                                <Row>
                                    <img src={process.env.REACT_APP_BACKEND_SERVER + event.act.picture} alt={""}/>
                                </Row>
                                <Row>
                                    <h3>Žánr:&nbsp;<span>{genresString}</span></h3>
                                </Row>
                                <Row>
                                    <h3>Délka:&nbsp;<span>{event.act.length} minut</span></h3>
                                </Row>
                                <Row>
                                    <h3>Obsazení:&nbsp;<span>{castString}</span></h3>
                                </Row>
                                <Row>
                                    <h3>Režie:&nbsp;<span>{directorsString}</span></h3>
                                </Row>
                            </Grid>
                        </div>
                        <div>
                            <p>{event.act.description}</p>
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