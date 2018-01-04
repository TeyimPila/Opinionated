/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */


import React from 'react'
import {Col, ControlLabel, FormControl, FormGroup} from "react-bootstrap";

const renderStatic = (props) => {
    const {input, label} = props
    return <FormGroup className="show-grid row"
    >
        <Col md={2}><ControlLabel>{label}</ControlLabel></Col>
        <Col md={5}>
            <FormControl.Static>{ input.value }</FormControl.Static>
        </Col>
        <Col md={5}>
            { ' ' }
        </Col>
    </FormGroup>
}

export default renderStatic