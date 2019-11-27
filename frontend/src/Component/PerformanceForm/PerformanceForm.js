import React, { Component } from "react";
import { Grid, Row} from "react-flexbox-grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Files from 'react-files';
import "./PerformanceForm.css";
import orm from "../../Models/ORM";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import BackendRequest from "../../Models/REST/BackendRequest";
import moment from "moment/moment";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import InstantAction from "../../Models/Utils/InstantAction";
import {ADD_ACT} from "../../Models/Entities/Act";
import Select from 'react-select';


class PerformanceForm extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            type: "",
            length: "",
            picture: "",
            genre: null,
            cast: null,
            director: null,
            rating: "",
            description: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {

        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        console.log(name);
        console.log(value);

        this.setState({
            [name]: value
        });
    };


    handleGenreChange = genre => {
        this.setState({
            genre
        });
        console.log(`Genre selected:`, genre);
    };

    handleCastChange = cast => {
        this.setState({
            cast
        });
        console.log(`Cast selected:`, cast);
    };

    handleDirectorChange = director => {
        this.setState({
            director
        });
        console.log(`Cast selected:`, director);
    };

    onFilesChange = (files) => {
        this.setState({
            picture: files[0].name
        });
    };

    onFilesError = (error, files) => {
        console.log('error code ' + error.code + ': ' + error.message)
    };

    /**
     * Handle Submit
     * @param event
     */
    handleSubmit(event) {

        event.preventDefault();

        /**
         * Function on success adding
         */
        const onSuccess = (response) => {

            if (response.data.act !== undefined) {
                InstantAction.dispatch({
                    type: ADD_ACT,
                    payload: response.data.act,
                });
            }
            InstantAction.redirect("/programme");
        };

        /**
         * On Error
         * @param response
         */
        const onError = (response) => {

        };

        /**
         * Payload to send
         * @type {{areaId: *}}
         */
        const data = {
            ...this.state
        };

        BackendRequest("post", "acts", data, onSuccess, onError, onError );
    }

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

    arrayMaker = (array) => {
        let final_array = [];
        for(let i = 0; i < array.length; i++) {
            let item = {
                value: array[i].id,
                label: array[i].name,
            };
            final_array.push(item);
        }
        return final_array;
    };

    componentDidMount = () => {
        this.fetchGenres();
        this.fetchActors();
        this.fetchDirectors();
    };

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const actTypes = session.ActType.all();
        const genres = this.arrayMaker(session.Genre.all().orderBy("name").toModelArray());
        const actors = this.arrayMaker(session.Actor.all().orderBy("name").toModelArray());
        const directors = this.arrayMaker(session.Director.all().orderBy("name").toModelArray());

        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className={"header-and-close"}>
                        <div className={"name-form"}>
                            <h1>Název:&nbsp;</h1>
                            <input type="text" name={"name"} id={"name"} value={this.state.name} onChange={this.handleChange}/>
                        </div>
                        <FontAwesomeIcon className={"font-awesome-icon"} icon={faWindowClose} onClick={this.props.closePopup}/>
                    </div>
                    <div className={"film-description"} style={{display: 'flex'}}>
                        <div style={{width: '20%'}}>
                            <Grid>
                                <Row>
                                    <h3>Plakát:&nbsp;</h3>
                                    <div className={"image-input"}>
                                        <Files
                                            className='files-dropzone'
                                            onChange={this.onFilesChange}
                                            onError={this.onFilesError}
                                            accepts={['image/png', 'image/jpg']}
                                            maxFiles={1}
                                            maxFileSize={10000000}
                                            minFileSize={0}
                                            clickable
                                        >
                                            {(this.state.picture === "") ? "Vložte obrázek nebo klikněte a následně vyberte obrázek" : this.state.picture}
                                        </Files>
                                    </div>
                                </Row>
                                <Row>
                                    <h3>Typ:&nbsp;</h3>
                                    <select name={"type"} onChange={this.handleChange} value={this.state.type}>
                                        <option disabled>Zvolte typ představení</option>
                                        {actTypes.toModelArray().map(actType => {
                                            return <option key={actType.id} value={actType.id}>{actType.name}</option>;
                                        })}
                                    </select>
                                </Row>
                                <Row>
                                    <h3>Žánr:&nbsp;</h3>
                                    <Select
                                        value={this.state.genre}
                                        onChange={this.handleGenreChange}
                                        options={genres}
                                        isMulti={true}
                                    />
                                </Row>
                                <Row>
                                    <h3>Obsazení:&nbsp;</h3>
                                    <Select
                                        value={this.state.cast}
                                        onChange={this.handleCastChange}
                                        options={actors}
                                        isMulti={true}
                                    />
                                </Row>
                                <Row>
                                    <h3>Režie:&nbsp;</h3>
                                    <Select
                                        value={this.state.director}
                                        onChange={this.handleDirectorChange}
                                        options={directors}
                                        isMulti={true}
                                    />
                                </Row>
                                <Row>
                                    <h3>Délka (v minutách):&nbsp;</h3>
                                    <input type="text" name={"length"} id={"length"} value={this.state.length} onChange={this.handleChange}/>
                                </Row>
                                <Row>
                                    <h3>Hodnocení (1-10):&nbsp;</h3>
                                    <input type="text" name={"rating"} id={"rating"} value={this.state.rating} onChange={this.handleChange}/>
                                </Row>
                            </Grid>
                        </div>
                        <div className={"right-side"}>
                            <div className={"description"}>
                                <h3>Popis:</h3>
                                <textarea name={"description"} id={"description"} value={this.state.description} onChange={this.handleChange} />
                            </div>
                            <br/>
                            <br/>
                            <button onClick={this.handleSubmit}>Uložit</button>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(PerformanceForm));