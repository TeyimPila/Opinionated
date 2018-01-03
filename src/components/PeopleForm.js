import React from 'react';
import {Field, reduxForm} from 'redux-form'
import {Form, Col, Grid, Row, Button} from "react-bootstrap";
import renderField from '../../../Opinionated/src/renderFields/renderField'

const PeopleForm = (props) => {

    const {handleSubmit, pristine, reset, submitting} = props

    return (
        <div className="well well-sm">
            <Form horizontal onSubmit={handleSubmit}>
                <Grid>
                    <Row className="show-grid">
                        <hr/>
                    </Row>
                    <Field name="firstname" type="text" label="First Name"
                           component={renderField}
                    />
                    <Field name="lastname" type="text" label="Last Name"
                           component={renderField}
                    />
                    <Row className="show-grid">
                        <br/>
                    </Row>
                    <Row className="show-grid">
                        <Col md={2}>
                            {' '}
                        </Col>
                        <Col md={10}>
                            <Button bsStyle="primary" bsSize="xsmall" type="submit"
                                    disabled={submitting}>Submit</Button>
                            <Button type="button" bsSize="xsmall" disabled={pristine || submitting} onClick={reset}>Clear
                                Values</Button>
                        </Col>
                    </Row>
                </Grid>
            </Form>
        </div>
    )
}

export default reduxForm({
    form: 'pform'  // a unique identifier for this form
})(PeopleForm)