import React from 'react'
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";

const renderTextArea = ({input, label, meta: {touched, error, warning}}) => {

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
                componentClass="textarea"
                placeholder={label}
            />
            <FormControl.Feedback/>
        </Col>
        <Col md={5}>
            {touched &&
            ((error && <HelpBlock>{error}</HelpBlock>) ||
                (warning && <HelpBlock>{warning}</HelpBlock>))}
        </Col>
    </FormGroup>
}


export default renderTextArea
