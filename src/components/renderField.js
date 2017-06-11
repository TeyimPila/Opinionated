import React from 'react'
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

const renderField = ({input, label, type, meta: {touched, error, warning}}) => {

    const getValidationState = () => {
        return error ? 'error' : warning ? 'warning' : 'success'
    }

    const fb = (type) => {
        if( type === 'text' || type === 'number' || type === 'email' || type === 'date')
            return true
        else
            return false
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
            {fb(type) && <FormControl.Feedback/>}
        </Col>
        <Col md={5}>
            {touched &&
            ((error && <HelpBlock>{error}</HelpBlock>) ||
                (warning && <HelpBlock>{warning}</HelpBlock>))}
        </Col>
    </FormGroup>
}


export default renderField
