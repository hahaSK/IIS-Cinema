import React, { Component } from "react";
import { Grid, Row, Col } from "react-flexbox-grid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome/index.es";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';
import Files from 'react-files';
import "./PerformanceForm.css";


export default class PerformanceForm extends Component {

    state= {
        age_limit: "",
        name: "",
        year: "",
        country: "",
        version: "",
        genre: "",
        duration: "",
        director: "",
        description: "",
        file_name:"",
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    onFilesChange = (files) => {
        console.log(files);
        this.setState({
            file_name: files[0].name
        });
    };

    onFilesError = (error, files) => {
        console.log('error code ' + error.code + ': ' + error.message)
    };

    render() {
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div className={"header-and-close"}>
                        <div className={"name-form"}>
                            <h1>Název:&nbsp;</h1>
                            <input type="text" defaultValue={this.state.name} onChange={this.handleChange} />
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
                                            {(this.state.file_name === "") ? "Vložte obrázek nebo klikněte a následně vyberte obrázek" : this.state.file_name}
                                        </Files>
                                    </div>
                                </Row>
                                <Row>
                                    <h3>Věková hranice:&nbsp;</h3><input type="text" defaultValue={this.state.age_limit} onChange={this.handleChange} />
                                </Row>
                                <Row>
                                    <h3>Rok:&nbsp;</h3><input type="text" defaultValue={this.state.year} onChange={this.handleChange} />
                                </Row>
                                <Row>
                                    <h3>Země:&nbsp;</h3><input type="text" defaultValue={this.state.country} onChange={this.handleChange} />
                                </Row>
                                <Row>
                                    <h3>Znění:&nbsp;</h3><input type="text" defaultValue={this.state.version} onChange={this.handleChange} />
                                </Row>
                                <Row>
                                    <h3>Žánr:&nbsp;</h3><input type="text" defaultValue={this.state.genre} onChange={this.handleChange} />
                                </Row>
                                <Row>
                                    <h3>Délka:&nbsp;</h3><input type="text" defaultValue={this.state.duration} onChange={this.handleChange} />
                                </Row>
                                <Row>
                                    <h3>Režie:&nbsp;</h3><input type="text" defaultValue={this.state.director} onChange={this.handleChange} />
                                </Row>
                            </Grid>
                        </div>
                        <div className={"right-side"}>
                            <div className={"description"}>
                                <h3>Popis:</h3>
                                <textarea defaultValue={this.state.description} onChange={this.handleChange} />
                            </div>
                            <br/>
                            <div className={"ytb-href"}>
                                <h3>Odkaz na Youtube:</h3>
                                <input type="text" defaultValue={this.state.director} onChange={this.handleChange} />
                            </div>
                            <br/>
                            <button >Uložit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}