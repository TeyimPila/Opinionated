import React from 'react'
import {Col, ControlLabel, Radio, FormGroup, HelpBlock} from "react-bootstrap";

const renderRadio = ({input, label, options, inline, meta: {touched, error, warning}, ...rest}) => {

    const getValidationState = () => {
        return error ? 'error' : warning ? 'warning' : 'success'
    }

    return <FormGroup className="show-grid row"
                      controlId="formBasicText"
                      validationState={getValidationState()}
    >
        <Col md={2}><ControlLabel>{label}</ControlLabel></Col>
        <Col md={5}>
            {options.map((o, index) => (
                <Radio inline={inline}
                       key={index}
                       {...input}
                       {...rest}
                       value={o.value}
                       checked={input.value === o.value}
                >{o.label}</Radio>
            ))}
        </Col>
        <Col md={5}>
            {touched &&
            ((error && <HelpBlock>{error}</HelpBlock>) ||
                (warning && <HelpBlock>{warning}</HelpBlock>))}
        </Col>
    </FormGroup>
}


export default renderRadio
