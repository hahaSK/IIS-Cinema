import React, { Component } from "react";
import connect from "react-redux/es/connect/connect";
import {withRouter} from "react-router-dom";

class DrawGrid extends Component {
    onClickSeat(seat) {
        this.props.onClickData(seat);
    }

    render() {

        let width_compute = (100 / (this.props.columns)) - 0.7 ;
        let width = width_compute.toString() + "%";
        let i = 0;

        return (
            <div className="container">
                <table className="grid">
                    <tbody>
                    <tr>
                        {this.props.seat.map (row => { //všechna sedadla pro danou událost 1 - n
                            i = i + 1;
                            if (this.props.reserved.indexOf(row) > -1) {
                                return (
                                    <td
                                        className={"reserved"}
                                        key={row} style={{width: width}} onClick = {e => this.onClickSeat(row)}>{i}
                                    </td>
                                );
                            }
                            else {
                                if (this.props.occupied.indexOf(row) > -1) {
                                    return (
                                        <td
                                            className={"occupied"}
                                            key={row} style={{width: width}}>{i}
                                        </td>
                                    );
                                }
                                else {
                                    return (
                                        <td
                                            className={"available"}
                                            key={row} style={{width: width}} onClick = {e => this.onClickSeat(row)}>{i}
                                        </td>
                                    );
                                }
                            }
                        })}
                    </tr>
                    </tbody>
                </table>

                {/*<AvailableList available = { this.props.available } />*/}
                {/*<ReservedList reserved = { this.props.reserved } />*/}
            </div>
        )
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps())(DrawGrid));