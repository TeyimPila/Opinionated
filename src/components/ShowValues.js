/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */


import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

const ShowValues = (props) => {
    const style = {
        fontWeight: "bold",
        color: '#141887',
    }

    const tablestyle = {
        width:'50%',
        border: '1px solid black'
    }

    const {form} = props

    const Succeeded = () => {
        if (form.submitSucceeded) {
            return <div>
                <h1>Submit Succeeded!</h1>
            </div>
        } else
            return <div>No Success Yet - keep trying</div>
    }

    const Failed = () => {
        if (form.submitFailed) {
            return <div>
                <h1>Submit failed</h1>
                <span>{JSON.stringify(form.syncErrors, null, 2)}</span>
            </div>
        } else
            return <div>No fail yet</div>
    }

    const Warnings = () => {
        if (form.syncWarnings) {
            return <div>
                <h2>Warning - Danger Will Robinson!</h2>
                <span>{JSON.stringify(form.syncWarnings, null, 2)}</span>
            </div>
        } else
            return <div>No warnings yet</div>
    }

    const Values = () => {

        const o = form.values
        if(o) {
            const r = Object.keys(o).map((key, index) => {
                return <tr key={index}>
                    <td>{key}</td>
                    <td>{': '}</td>
                    <td>{JSON.stringify(o[key])}</td>
                </tr>
            })
            return (<table style={tablestyle}>
                <tbody>{r}</tbody>
            </table>)
        }
    }

    return <div className="well well-sm" style={style}>
        <h3>This page is independent of the form</h3>
        <p>It exists simple to show how the Values, Warnings and Errors can be accessed</p>
        <p>Most of the fields have some validations or warning triggers, see the code in MyForm</p>
        <Values/>
        <Succeeded/>
        <Warnings/>
        <Failed/>
    </div>
}

ShowValues.propTypes = {
    form: PropTypes.object
};

function mapStateToProps(state) {
    return {
        form: state.form.theForm
    };
}

export default connect(
    mapStateToProps
)(ShowValues);
