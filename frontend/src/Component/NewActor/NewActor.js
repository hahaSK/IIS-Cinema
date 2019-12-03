import React, { Component } from "react";
import { Grid, Row, Col} from "react-flexbox-grid";
import "./NewActor.css";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import BackendRequest from "../../Models/REST/BackendRequest";
import InstantAction from "../../Models/Utils/InstantAction";
import {ADD_ACTOR} from "../../Models/Entities/Actor";
import Files from 'react-files';
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";

class NewActor extends Component {

    /**
     * Constructor
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            year: "",
            picture: "",
            message: "",
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

        if (this.state.name === ""){
            this.setState({
                message: "Zadejte jméno."
            });
            return;
        }
        else if (this.state.year === ""){
            this.setState({
                message: "Zadejte ročník narození."
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
        const onSuccess = (response) => {

            if (response.data.actor !== undefined) {
                InstantAction.dispatch({
                    type: ADD_ACTOR,
                    payload: response.data.actor,
                });
            }
            MasterDispatcher.dispatch(response.data);
            this.props.handler();
            InstantAction.setToast("Herec vytvořen");
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

        BackendRequest("post", "actor", data, onSuccess, onError, onError );
    }

    render() {

        return (
            <div className={"new-actor"}>
                <Grid>
                    <Row>
                        <Col xs={5}/>
                        <Col xs={2}>
                            <h3>Jméno:</h3>
                            <input type="text" name={"name"} id={"name"} value={this.state.name} onChange={this.handleChange}/>
                        </Col>
                        <Col xs={1}>
                            <h3>Ročník:</h3>
                            <input type="text" name={"year"} id={"year"} value={this.state.year} onChange={this.handleChange}/>
                        </Col>
                        <Col xs={4}>
                            <h3>Foto:&nbsp;</h3>
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
                                    {(this.state.picture === "") ? "Vložte obrázek nebo klikněte a vyberte obrázek" : this.state.picture}
                                </Files>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}/>
                        <Col xs={6} style={{display: "flex", justifyContent: "flex-end"}}>
                            <p style={{color: "red", margin: 0}}>{this.state.message}</p>
                            <button onClick={this.handleSubmit}>Vytvořit herce</button>
                        </Col>
                    </Row>
                </Grid>
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(NewActor));