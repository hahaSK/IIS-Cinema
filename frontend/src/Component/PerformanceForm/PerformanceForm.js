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
import InstantAction from "../../Models/Utils/InstantAction";
import {ADD_ACT, UPDATE_ACT} from "../../Models/Entities/Act";
import Select from 'react-select';


class PerformanceForm extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        if (props.act != null) {
            const { entities } = this.props;
            const session = orm.session(entities);

            let genres = [];
            let cast = [];
            let director = [];

            for (let i = 0; i < props.act._fields.genre.length; i++) {
                let item = {
                    value: props.act._fields.genre[i],
                    label: session.Genre.withId(props.act._fields.genre[i]).name,
                };
                genres.push(item);
            }

            for (let i = 0; i < props.act._fields.cast.length; i++) {
                let item = {
                    value: props.act._fields.cast[i],
                    label: session.Actor.withId(props.act._fields.cast[i]).name,
                };
                cast.push(item);
            }

            for (let i = 0; i < props.act._fields.director.length; i++) {
                let item = {
                    value: props.act._fields.director[i],
                    label: session.Director.withId(props.act._fields.director[i]).name,
                };
                director.push(item);
            }

            this.state = {
                id: props.act.id,
                name: props.act.name,
                type: props.act._fields.type,
                length: props.act.length,
                picture: props.act.picture,
                genre: [],
                cast: [],
                director: [],
                genreHelp : genres,
                castHelp : cast,
                directorHelp : director,
                rating: props.act.rating,
                description: props.act.description,
            };
        }
        else {
            this.state = {
                id: "",
                name: "",
                type: 0,
                length: "",
                picture: "",
                genre: [],
                cast: [],
                director: [],
                genreHelp : null,
                castHelp : null,
                directorHelp : null,
                rating: 50,
                description: "",
            }
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {

        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };


    handleGenreChange = genreHelp => {

        this.setState({
            genreHelp
        });

        console.log(genreHelp);
    };

    handleCastChange = castHelp => {

        this.setState({
            castHelp
        });
    };

    handleDirectorChange = directorHelp => {

        this.setState({
            directorHelp
        });
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
        const onPostSuccess = (response) => {

            if (response.data.act !== undefined) {
                InstantAction.dispatch({
                    type: ADD_ACT,
                    payload: response.data.act,
                });
            }
            this.props.handler();
            InstantAction.setToast("Představení vytvořeno");
        };

        /**
         * Function on success updating
         */
        const onPutSuccess = (response) => {

            if (response.data.act !== undefined) {
                InstantAction.dispatch({
                    type: UPDATE_ACT,
                    payload: response.data.act,
                });
            }
            this.props.handler();
            InstantAction.setToast("Představení upraveno");
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

        let genre_array = [];
        for (let i = 0; i < this.state.genreHelp.length; i++)
            genre_array.push(this.state.genreHelp[i].value);

        let cast_array = [];
        for (let i = 0; i < this.state.castHelp.length; i++)
            cast_array.push(this.state.castHelp[i].value);

        let director_array = [];
        for (let i = 0; i < this.state.directorHelp.length; i++)
            director_array.push(this.state.directorHelp[i].value);


        const data = {
            name: this.state.name,
            picture: this.state.picture,
            type: this.state.type,
            genre: JSON.stringify(genre_array),
            cast: JSON.stringify(cast_array),
            director: JSON.stringify(director_array),
            rating: this.state.rating,
            length: this.state.length,
            description: this.state.description
        };

        if (this.state.id !== "")
            BackendRequest("put", "act/" + this.props.act.id, data, onPutSuccess, onError, onError );
        else
            BackendRequest("post", "acts", data, onPostSuccess, onError, onError );
    }

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
                                        <option value={0} disabled>Zvolte typ představení</option>
                                        {actTypes.toModelArray().map(actType => {
                                            return <option key={actType.id} value={actType.id}>{actType.name}</option>;
                                        })}
                                    </select>
                                </Row>
                                <Row>
                                    <h3>Žánr:&nbsp;</h3>
                                    <Select
                                        value={this.state.genreHelp}
                                        onChange={this.handleGenreChange}
                                        options={genres}
                                        isMulti={true}
                                    />
                                </Row>
                                <Row>
                                    <h3>Obsazení:&nbsp;</h3>
                                    <Select
                                        value={this.state.castHelp}
                                        onChange={this.handleCastChange}
                                        options={actors}
                                        isMulti={true}
                                    />
                                </Row>
                                <Row>
                                    <h3>Režie:&nbsp;</h3>
                                    <Select
                                        value={this.state.directorHelp}
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
                                    <h3>Hodnocení (v %):&nbsp;</h3>
                                    <input type="number" name={"rating"} id={"rating"} min={0} max={100} value={this.state.rating} onChange={this.handleChange}/>
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