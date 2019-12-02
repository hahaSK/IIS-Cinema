import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './ActsScene.css'
import Navigation from "../../Component/Navigation/Navigation";
import ActView from "../../Component/PerformanceView/PerformanceView";
import ActForm from "../../Component/PerformanceForm/PerformanceForm";
import BackendRequest from "../../Models/REST/BackendRequest";
import MasterDispatcher from "../../Models/Utils/MasterDispatcher";
import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import orm from "../../Models/ORM/index";
import "moment/min/locales";
import NewActor from "../../Component/NewActor/NewActor";
import NewDirector from "../../Component/NewDirector/NewDirector";
import NewGenre from "../../Component/NewGenre/NewGenre";
import NewActType from "../../Component/NewActType/NewActType";
import {REMOVE_HALL} from "../../Models/Entities/Hall";
import InstantAction from "../../Models/Utils/InstantAction";
import {REMOVE_ACT} from "../../Models/Entities/Act";

class ActsScene extends Component {

    constructor(props) {
        super(props);

        this.state = {
            act: "",
            showActForm: false,
            editActForm: false,
            newActor: false,
            newDirector: false,
            newGenre: false,
            newActType: false,
            actType: 0,
        };

        this.toggleActForm = this.toggleActForm.bind(this);
        this.toggleNewActor = this.toggleNewActor.bind(this);
        this.toggleNewDirector = this.toggleNewDirector.bind(this);
        this.toggleNewGenre = this.toggleNewGenre.bind(this);
        this.toggleNewActType = this.toggleNewActType.bind(this);
    }


    handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleEditClick = (editAct) => {
        this.setState({
            editActForm: !this.state.editActForm,
            act: editAct
        });
    };

    handleEditClose = () => {
        this.setState({
            editActForm: !this.state.editActForm,
        });
    };


    /**
     * Handle Delete Click
     * @param deleteAct
     */
    handleDeleteClick = (deleteAct) => {

        /**
         * Delete act
         * @param response
         */
        const onSuccess = (response) => {

            InstantAction.dispatch({
                type: REMOVE_ACT,
                payload: deleteAct.id,
            });

            MasterDispatcher.dispatch(response.data);

            InstantAction.setToast("Představení zrušeno");
        };

        BackendRequest("delete", "act/" + deleteAct.id, null, onSuccess);
    };

    toggleActForm = () => {
        this.setState({
            showActForm: !this.state.showActForm
        });
    };

    toggleNewActor = () => {
        this.setState({
            newActor: !this.state.newActor,
            newDirector: false,
            newGenre: false,
            newActType: false,
        });
    };

    toggleNewDirector = () => {
        this.setState({
            newActor: false,
            newDirector: !this.state.newDirector,
            newGenre: false,
            newActType: false,
        });
    };

    toggleNewGenre = () => {
        this.setState({
            newActor: false,
            newDirector: false,
            newGenre: !this.state.newGenre,
            newActType: false,
        });
    };

    toggleNewActType = () => {
        this.setState({
            newActor: false,
            newDirector: false,
            newGenre: false,
            newActType: !this.state.newActType,
        });
    };

    fetchActTypes = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "acttypes", null, onSuccess);
    };

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

    fetchActs = () => {

        /**
         * On Success
         * @param response
         */
        const onSuccess = (response) => {

            MasterDispatcher.dispatch(response.data);
        };

        BackendRequest("get", "acts", null, onSuccess);
    };

    componentWillMount() {
        this.fetchActTypes();
        this.fetchGenres();
        this.fetchActors();
        this.fetchDirectors();
        this.fetchActs();
    }

    render() {

        const {entities} = this.props;
        const session = orm.session(entities);
        const acts = session.Act.all().orderBy("name");
        const actTypes = session.ActType.all();
        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Představení</h1>
                </div>
                <hr />
                <div className={"body acts"}>
                    <div className={"top-line"}>
                        <div className={"filter-events"}>
                            <h3 style={{margin: '0'}}>Typ představení:</h3>
                            <select name={"actType"} onChange={this.handleChange} value={this.state.actType}>
                                <option disabled>Zvolte typ představení</option>
                                <option key={0} value={0}>Všechny</option>
                                {actTypes.toModelArray().map(actType => {
                                    return <option key={actType.id} value={actType.id}>{actType.name}</option>;
                                })}
                            </select>
                        </div>
                        <div className={"create-new"}>
                            <button onClick={()=>this.toggleActForm()}>Vytvořit představení</button>
                            <button onClick={()=>this.toggleNewActor()}>Vytvořit herce</button>
                            <button onClick={()=>this.toggleNewDirector()}>Vytvořit režiséra</button>
                            <button onClick={()=>this.toggleNewGenre()}>Vytvořit žánr</button>
                            <button onClick={()=>this.toggleNewActType()}>Vytvořit typ představení</button>
                        </div>
                    </div>

                    {(this.state.newActor) ? <NewActor handler={this.toggleNewActor}/> : null}
                    {(this.state.newDirector) ? <NewDirector handler={this.toggleNewDirector}/> : null}
                    {(this.state.newGenre) ? <NewGenre handler={this.toggleNewGenre}/> : null}
                    {(this.state.newActType) ? <NewActType handler={this.toggleNewActType}/> : null}

                    {(acts.count() === 0) ? "Žádná představení" :
                        <Grid className={"result-table"}>
                            <Row>
                                <Col xs={3}>Název</Col>
                                <Col xs={1}>Typ</Col>
                                <Col xs={2}>Délka</Col>
                                <Col xs={6}/>
                            </Row>
                            {acts.toModelArray().map((act) => {

                                if(act._fields.type === null || act._fields.genre === null || act._fields.cast === null || act._fields.irector === null){
                                    return null;
                                }

                                if (parseInt(this.state.actType) === 0 || this.state.actType === act.type.id){
                                    return (
                                        <Row>
                                            <Col xs={3}>{act.name}</Col>
                                            <Col xs={1}>{act.type.name}</Col>
                                            <Col xs={2}>{act.length} minut</Col>
                                            <Col xs={6} className={"buttons"}>
                                                <button onClick={() => {this.handleEditClick(act)}}>Editovat</button>
                                                <button onClick={() => {this.handleDeleteClick(act)}}>Zrušit</button>
                                            </Col>
                                        </Row>
                                    );
                                }
                            })}
                        </Grid>
                    }

                    {(this.state.showActForm) ?
                        <ActForm
                            closePopup={this.toggleActForm.bind(this)}
                            handler={this.toggleActForm}
                        />
                        : null
                    }

                    {(this.state.editActForm) ?
                        <ActForm
                            act={this.state.act}
                            closePopup={this.handleEditClose.bind(this)}
                            handler={this.handleEditClose}
                        />
                        : null
                    }
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(ActsScene));