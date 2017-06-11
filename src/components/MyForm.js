import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {Form, Col, Grid, Row, Button} from "react-bootstrap";
import renderField from './renderField'
import renderStatic from './renderStatic'
import renderSelect from './renderSelect'
import renderCheckbox from './renderCheckbox'
import renderTextArea from './renderTextArea'
import renderRadio from './renderRadio'

//import { ControlLabel, FormControl, FormGroup, HelpBlock } from "react-bootstrap";

const now = new Date()
now.setHours(0, 0, 0, 0)

const required = value => value ? undefined : 'Required'
const notsteve = value => value === 'Steve' ? 'Hmmm Steve' : undefined


const isdate = value => value && new Date(value) instanceof Date ? undefined : 'Not a date'
const inpast = value => value && new Date(value) < now ? undefined : 'Must be in the past'

const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const maxLength50 = maxLength(50)
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
const minValue = min => value =>
    value && value < min ? `Must be at least ${min}` : undefined
const minValue18 = minValue(18)
const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined
const tooOld = value =>
    value && value > 75 ? 'You might be too old for this' : undefined
const aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined

const noweed = value => value === 'Weed' ? 'Say no to drugs mmmkay' : undefined


function countWords(str) {
    if(!str)
        return 0
    else
        return str.trim().split(/\s+/).length;
}

const toowordy = value => countWords(value) > 3 ? 'Too wordy' : undefined


const validate = (values) => {
    const errors = {}

    if (values.Solo && values.Licence === 'Restricted') {
        errors.Solo = 'do not fly solo on a restricted licence'
    }

    if (values.Plane === 'LearJet' && values.FirstName === 'Steve') {
        errors.Plane = 'No LearJet for Steve'
    }

    return errors
}

const licences = [
    {label: 'Restricted', value: 'Restricted'},
    {label: 'Solo', value: 'Solo'},
    {label: 'Unrestricted', value: 'Unrestricted'},
]

const MyForm = (props) => {

    const {handleSubmit, onDelete, pristine, reset, submitting} = props
    return (
        <div className="well well-sm">
            <Form horizontal onSubmit={handleSubmit}>
                <Grid>
                    <Row className="show-grid">
                        <hr/>
                    </Row>
                    <Field name="ID" label="ID"
                           component={renderStatic}
                    />
                    <Field name="FirstName" type="text" label="First Name"
                           component={renderField}
                           validate={[required, maxLength15]}
                           warn={notsteve}
                    />
                    <Field name="LastName" type="text" label="Last Name"
                           component={renderField}
                           validate={[required, maxLength50]}
                           warn={notsteve}
                    />
                    <Field name="Email" type="email" label="Email"
                           component={renderField}
                           validate={email}
                           warn={aol}
                    />
                    <Field name="Solo" type="checkbox" label="Ready to fly solo?"
                           parse={(value, name) => value ? true : false}
                           component={renderCheckbox}
                    />
                    <Field name="StartDate" type="date" label="Start Date"
                           component={renderField}
                           validate={[required, isdate, inpast]}
                           format={(value) => value.substring(0, 10)}
                    />
                    <Field name="Age" type="number" label="Age"
                           component={renderField}
                           validate={[required, number, minValue18]}
                           warn={tooOld}
                    />
                    <Field name="Notes" label="Notes"
                           component={renderTextArea}
                           validate={[required]}
                           warn={[toowordy]}
                    />

                    <Field name="Gender" type="select"  label="Gender"
                           component={renderSelect}
                           validate={[required]}>
                        <option></option>
                        <option >Male</option>
                        <option >Female</option>
                        <option >Trans</option>
                        <option >Fluid</option>
                        <option >Experimenting</option>
                    </Field>

                    <Field name="Plane" type="select"  label="Choose Plane"
                           component={renderSelect}
                           validate={[required, noweed]}>
                        <option></option>
                        <option >Cessna</option>
                        <option >LearJet</option>
                        <option >747</option>
                        <option >Weed</option>
                    </Field>

                    <Field name="Licence" component={renderRadio} label="Licence type"
                        options={licences}
                           inline
                    />


                    <Field name="Created" type="date" label="Created Date"
                           component={renderStatic}
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
                                    disabled={submitting}>Save</Button>
                            {' '}
                            <Button type="button" bsSize="xsmall" disabled={pristine || submitting} onClick={reset}>Clear
                                Values</Button>
                            {' '}
                            <Button bsStyle="danger" type="button" bsSize="xsmall" disabled={submitting} onClick={onDelete}>Delete</Button>
                        </Col>
                    </Row>
                </Grid>


            </Form>
        </div>
    )
}

export default reduxForm({
    form: 'theForm',
    validate
})(MyForm)