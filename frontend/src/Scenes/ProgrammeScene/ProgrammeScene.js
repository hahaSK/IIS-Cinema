import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import './ProgrammeScene.css'
import Navigation from "../../Component/Navigation/Navigation";
import MasterGetter from "../../Models/Utils/MasterGetter";
import PerformanceView from "../../Component/PerformanceView/PerformanceView";
import PerformanceForm from "../../Component/PerformanceForm/PerformanceForm";

class Programme extends Component {

    state = {
        event: null,
        showEvent: false,
        showPerformanceForm: false,
        performanceType: "",
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    onEventClick = (event) => {
        this.setState({
            event: event
        });
        this.toggleEvent();
    };

    toggleEvent = () => {
        this.setState({
            showEvent: !this.state.showEvent
        });
    };

    togglePerformanceForm = () => {
        this.setState({
            showPerformanceForm: !this.state.showPerformanceForm
        });
    };

    GetDates = (startDate, daysToAdd) => {
        let aryDates = [];

        for (let i = 0; i <= daysToAdd; i++) {
            let currentDate = new Date();
            currentDate.setDate(startDate.getDate() + i);
            aryDates.push(currentDate);
        }

        return aryDates;
    };

    MonthAsString = (monthIndex) => {
        let month = [];
        month[0] = "ledna";
        month[1] = "února";
        month[2] = "března";
        month[3] = "dubna";
        month[4] = "května";
        month[5] = "června";
        month[6] = "července";
        month[7] = "srpna";
        month[8] = "září";
        month[9] = "října";
        month[10] = "listopadu";
        month[11] = "prosince";

        return month[monthIndex];
    };

    DayAsString = (dayIndex) => {
        let weekdays = new Array(7);
        weekdays[0] = "Neděle";
        weekdays[1] = "Pondělí";
        weekdays[2] = "Úterý";
        weekdays[3] = "Středa";
        weekdays[4] = "Čtvrtek";
        weekdays[5] = "Pátek";
        weekdays[6] = "Sobota";

        return weekdays[dayIndex];
    };

    render() {

        const {entities} = this.props;
        const session = MasterGetter.getSession(entities);
        const events = session.Event.all();

        let today = new Date();
        let nextMonth = this.GetDates(today, 14);

        let dayEventList;
        let i = 0;
        let x = 0;

        return (
            <div className="App">
                <Navigation/>
                <div className={"header"}>
                    <h1>Program</h1>
                </div>
                <hr />
                <div className={"body programme"}>
                    <div className={"create-new"}>
                        <button onClick={()=>this.togglePerformanceForm()}>Vytvořit představení</button>
                        <button>Vytvořit událost</button>
                    </div>
                    <div>
                        <h3 style={{margin: '0'}}>Typ představení:</h3>
                        <select name={"performanceType"} onChange={this.handleChange} value={this.state.performanceType}>
                            <option disabled>Zvolte typ představení</option>
                            <option key={0} defaultValue={"vsechny"}>Všechny</option>
                            <option key={1} value={"film"} >Film</option>
                            <option key={2} value={"cinohra"}>Činohra</option>
                            {/*{types.toModelArray().map(type => {*/}
                            {/*return <option key={type.id} value={type.name}>{type.name}</option>;*/}
                            {/*})}*/}
                        </select>
                    </div>
                    <Grid className={"result-table"}>


                    {nextMonth.map(weekday => {
                        dayEventList = [];
                        x++;
                        return (
                            <div key={x}>
                                {events.toModelArray().map(event => {
                                    if (weekday.getDate() === event._fields.date.getDate() && weekday.getMonth() === event._fields.date.getMonth() && weekday.getFullYear() === event._fields.date.getFullYear()){
                                        dayEventList.push(event);
                                    }
                                    return "";
                                })}
                                {dayEventList.map(dayEvent => {
                                    if(dayEventList.length !== 0) {
                                        i++;
                                        return (
                                            <div key={i}>
                                                {(i === 1) ?
                                                    <span>
                                                    <h1>{this.DayAsString(weekday.getDay()) + ", " + weekday.getDate() + ". " + this.MonthAsString(weekday.getMonth())}</h1>
                                                    <hr/>
                                                    </span>
                                                    : ""}
                                                <Row>
                                                    <Col xs={2} onClick={()=>this.onEventClick(dayEvent)}>{dayEvent.type}</Col>
                                                    <Col xs={4} onClick={()=>this.onEventClick(dayEvent)}>{dayEvent.name}</Col>
                                                    <Col xs={1} onClick={()=>this.onEventClick(dayEvent)}>{dayEvent.time}</Col>
                                                    <Col xs={5}>
                                                        <button onClick={()=> {alert("Vstupenky")}}>Koupit vstupenky</button>
                                                        <button onClick={()=> {alert("Editovat")}}>Editovat</button>
                                                        <button onClick={()=> {alert("Zrušit")}}>Zrušit</button>
                                                    </Col>
                                                </Row>
                                            </div>
                                        );
                                    }
                                    else {
                                        return "";
                                    }
                                })}
                            </div>
                        );
                    })}
                    </Grid>

                    {(this.state.showEvent) ?
                        <PerformanceView
                            event={this.state.event}
                            closePopup={this.toggleEvent.bind(this)}
                        />
                        : null
                    }

                    {(this.state.showPerformanceForm) ?
                        <PerformanceForm
                        event={this.state.event}
                        closePopup={this.togglePerformanceForm.bind(this)}
                        />
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default Programme;