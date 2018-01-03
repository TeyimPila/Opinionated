import React from 'react'

import {Field, reduxForm} from 'redux-form'
import {Form, Col, Grid, Row, Button} from "react-bootstrap";
import renderField from '../../../Opinionated/src/renderFields/renderField'
import renderStatic from '../../../Opinionated/src/renderFields/renderStatic'
import renderSelect from '../../../Opinionated/src/renderFields/renderSelect'
import renderCheckbox from '../../../Opinionated/src/renderFields/renderCheckbox'
import renderTextArea from '../../../Opinionated/src/renderFields/renderTextArea'
import renderRadio from '../../../Opinionated/src/renderFields/renderRadio'
import renderDatePicker from '../../../Opinionated/src/renderFields/renderDatePicker'
import {fmt} from "../util/date-funcs";

//import { ControlLabel, FormControl, FormGroup, HelpBlock } from "react-bootstrap";

const now = new Date()
now.setHours(0, 0, 0, 0)

const required = value => value ? undefined : 'Required'
const notsteve = value => value === 'Steve' ? 'Hmmm Steve' : undefined


const isdate = value => value && new Date(value) instanceof Date ? undefined : 'Not a date'
//const inpast = value => value && new Date(value) < now ? undefined : 'Must be in the past'

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

const toowordy = value => countWords(value) > 100 ? 'Too wordy' : undefined

function countWords(str) {
    if (!str)
        return 0
    else
        return str.trim().split(/\s+/).length;
}


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

    const {handleSubmit, onDelete, pristine, reset, submitting, adding, readOnly} = props
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
                           readOnly={readOnly}
                    />
                    <Field name="LastName" type="text" label="Last Name"
                           component={renderField}
                           validate={[required, maxLength50]}
                           warn={notsteve}
                           readOnly={readOnly}
                    />
                    <Field name="Email" type="email" label="Email"
                           component={renderField}
                           validate={email}
                           warn={aol}
                           readOnly={readOnly}
                    />
                    <Field name="Solo" type="checkbox" label="Ready to fly solo?"
                           parse={(value, name) => value ? true : false}
                           component={renderCheckbox}
                           readOnly={readOnly}
                    />

                    <Field
                        name="StartDate"
                        label="Start Date"
                        inputValueFormat="DD/MM/YYYY"
                        dateFormat="YYYY-MM-DD"
                        // dateFormatCalendar="dddd"
                        // fixedHeight
                        // showMonthDropdown
                        // showYearDropdown
                        // dropdownMode="select"
                        //normalize={value => (value ? moment(value).format('YYYY-MM-DD') : null)}
                        component={renderDatePicker}
                        validate={[required, isdate]}
                        format={(value) => fmt(value)}
                    />
                    <Field name="Age" type="number" label="Age"
                           component={renderField}
                           validate={[required, number, minValue18]}
                           warn={tooOld}
                           readOnly={readOnly}
                    />
                    <Field name="Notes" label="Notes"
                           component={renderTextArea}
                           validate={[required]}
                           warn={[toowordy]}
                           readOnly={readOnly}
                    />

                    <Field name="Gender" type="select" label="Gender"
                           component={renderSelect}
                           validate={[required]}
                           readOnly={readOnly}
                    >
                        <option></option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Trans</option>
                        <option>Fluid</option>
                        <option>Experimenting</option>
                    </Field>

                    <Field name="Plane" type="select" label="Choose Plane"
                           component={renderSelect}
                           validate={[required, noweed]}
                           readOnly={readOnly}
                    >
                        <option></option>
                        <option>Cessna</option>
                        <option>LearJet</option>
                        <option>747</option>
                        <option>Weed</option>
                    </Field>

                    <Field name="Licence" component={renderRadio} label="Licence type"
                           options={licences}
                           inline
                           readOnly={readOnly}
                    />


                    {!adding && <Field name="Created" type="text" label="Created Date"
                                       component={renderStatic}
                                       format={(value) => fmt(value)}
                    />}

                    <Row className="show-grid">
                        <br/>
                    </Row>

                    {!adding && !readOnly && <Row className="show-grid">
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
                            <Button bsStyle="danger" type="button" bsSize="xsmall" disabled={submitting}
                                    onClick={onDelete}>Delete</Button>
                        </Col>
                    </Row>}
                    {adding && <Row className="show-grid">
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
                        </Col>
                    </Row>}
                </Grid>


            </Form>
        </div>
    )
}

export default reduxForm({
    form: 'theForm',
    validate
})(MyForm)