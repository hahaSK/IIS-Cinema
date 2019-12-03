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
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";


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
                picture: props.act.picture.name,
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
                picture: null,
                genre: [],
                cast: [],
                director: [],
                genreHelp : null,
                castHelp : null,
                directorHelp : null,
                rating: 50,
                description: "",
                message: ""
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

    handleFileChange(selectorFiles: FileList)
    {
        this.setState({
            picture: selectorFiles[0],
        });
    }


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

    /**
     * Handle Submit
     * @param event
     */
    handleSubmit(event) {

        event.preventDefault();

        if (this.state.name === ""){
            this.setState({
                message: "Zadejte název."
            });
            return;
        }
        else if (this.state.picture === null){
            this.setState({
                message: "Nahrajte obrázek."
            });
            return;
        }
        else if (this.state.type === 0){
            this.setState({
                message: "Vyberte typ představení."
            });
            return;
        }
        else if (this.state.genreHelp === null){
            this.setState({
                message: "Vyberte žánr(y)."
            });
            return;
        }
        else if (this.state.castHelp === null){
            this.setState({
                message: "Vyberte herce."
            });
            return;
        }
        else if (this.state.directorHelp === null){
            this.setState({
                message: "Vyberte režiséra/y."
            });
            return;
        }
        else if (this.state.length === ""){
            this.setState({
                message: "Zadejte délku představení."
            });
            return;
        }
        else if (this.state.description === ""){
            this.setState({
                message: "Zadejte popis představení."
            });
            return;
        }
        else {
            this.setState({
                message: ""
            })
        }

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
            MasterDispatcher.dispatch(response.data);

            if (this.state.picture !== null) {

                /**
                 * Function on success adding
                 */
                const onSuccess = (response) => {

                    MasterDispatcher.dispatch(response.data);
                    this.props.handler();
                    InstantAction.setToast("Představení vytvořeno");
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
                    file: this.state.picture,
                };

                BackendRequest("post", "upload", data, onSuccess, onError, onError );

            }
            else {
                this.props.handler();
                InstantAction.setToast("Představení vytvořeno");
            }
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
            MasterDispatcher.dispatch(response.data);
            if (this.state.picture !== null) {

                /**
                 * Function on success adding
                 */
                const onSuccess = (response) => {

                    MasterDispatcher.dispatch(response.data);
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
                const data = {
                    file: this.state.picture,
                };

                BackendRequest("post", "upload", data, onSuccess, onError, onError );

            }
            else {
                this.props.handler();
                InstantAction.setToast("Představení upraveno");
            }
        };

        /**
         * On Error
         * @param response
         */
        const onError = (response) => {

        };

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
            type: this.state.type,
            picture: this.state.picture.name,
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
            BackendRequest("post", "act", data, onPostSuccess, onError, onError );
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
                                        <input type="file" accept="image/png, image/jpeg" onChange={ (e) => this.handleFileChange(e.target.files) } />
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
                            <p style={{color: "red", margin: 0, textAlign: "right", paddingRight: "4rem"}}>{this.state.message}</p>
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