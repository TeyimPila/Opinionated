
import React from 'react'
import {Col, Row} from "react-bootstrap";

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {

    return <Row className="show-grid">
        <Col md={2}>
            <label>{label}</label>
        </Col>
        <Col md={5}>
            {type === 'textarea' ? <textarea className="form-control" {...input} placeholder={label}/> :
                <input className="form-control" {...input} placeholder={label} type={type}/>}
        </Col>
        <Col md={5}>
            {touched &&
            ((error && <span style={{fontWeight: "bold", color: 'red'}}>{error}</span>) ||
                (warning && <span style={{fontWeight: "bold", color: 'darkorange'}}>{warning}</span>))}
        </Col>
    </Row>
}


export default renderField