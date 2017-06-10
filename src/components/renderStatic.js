
import React from 'react'
import {Col, Row} from "react-bootstrap";

const renderStatic = ({input, label}) => {

    return <Row className="show-grid">
        <Col md={2}>
            <label>{label}</label>
        </Col>
        <Col md={5} className="form-control-static">
            <p>{input.value}</p>
        </Col>
        <Col md={5}>
            {' '}
        </Col>
    </Row>
}


export default renderStatic