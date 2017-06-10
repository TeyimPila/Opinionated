import React from 'react'
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {

    const getValidationState = () => {
        return error ? 'error' : warning ? 'warning' : 'success'
    }

    return <FormGroup className="show-grid row"
                      controlId="formBasicText"
                      validationState={getValidationState()}
    >
        <Col md={2}><ControlLabel>{label}</ControlLabel></Col>
        <Col md={5}>
            <FormControl
                {...input}
                type={type}
                placeholder={label}
            />
            {type === 'text' && <FormControl.Feedback/>}
        </Col>
        <Col md={5}>
            {touched &&
            ((error && <HelpBlock>{error}</HelpBlock>) ||
                (warning && <HelpBlock>{warning}</HelpBlock>))}
        </Col>
    </FormGroup>
}


export default renderField
