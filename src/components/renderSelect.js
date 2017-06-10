
import React from 'react'
import {Col, Row} from "react-bootstrap";

const renderSelect = (props) => {
    const {input, label, children, meta: {touched, error, warning}} = props
    return <Row className="show-grid">
        <Col md={2}>
            <label>{label}</label>
        </Col>
        <Col md={5}>
            <select className="form-control"  {...input} >{children}</select>
        </Col>
        <Col md={5}>
            {touched &&
            ((error && <span style={{fontWeight: "bold", color: 'red'}}>{error}</span>) ||
                (warning && <span style={{fontWeight: "bold", color: 'darkorange'}}>{warning}</span>))}
        </Col>
    </Row>
}



export default renderSelect