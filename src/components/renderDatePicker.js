import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {Col, ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './react-datepicker-size-fix.css'

export default class renderDatePicker extends React.Component {
    static propTypes = {
        input: PropTypes.shape({
            onChange: PropTypes.func,
            value: PropTypes.string,
        }).isRequired,
        meta: PropTypes.shape({
            touched: PropTypes.bool,
            error: PropTypes.string,
            warning: PropTypes.string,
        }).isRequired,
        inputValueFormat: PropTypes.string,
    };

    static defaultProps = {
        inputValueFormat: null,
    };

    state = {
        selectedDate: null,
    };

    componentWillMount() {
        if (this.props.input.value) {
            this.setState({
                selectedDate: moment(this.props.input.value, this.props.inputValueFormat),
            });
        }
    }

    handleChange = (date) => {
        this.setState({
            selectedDate: date,
        });

        this.props.input.onChange(date);
    }


    render() {
        const {
            input, label,
            meta: {touched, error, warning},
            ...rest
        } = this.props;

        const getValidationState = () => {
            return error ? 'error' : warning ? 'warning' : 'success'
        }

        return (

            <FormGroup className="show-grid row"
                       controlId="formBasicText"
                       validationState={getValidationState()}
            >
                <Col md={2}><ControlLabel>{label}</ControlLabel></Col>
                <Col md={2}>
                    <FormControl
                        {...input}
                        {...rest}
                        componentClass={DatePicker}
                        // placeholder={label}
                        selected={this.state.selectedDate}
                        onChange={this.handleChange}
                    />
                    <FormControl.Feedback/>
                </Col>
                <Col md={5}>
                    {touched &&
                    ((error && <HelpBlock>{error}</HelpBlock>) ||
                        (warning && <HelpBlock>{warning}</HelpBlock>))}
                </Col>
            </FormGroup>
        )
    }
}
/*
            <div>
                <DatePicker
                    {...rest}
                    selected={this.state.selectedDate}
                    onChange={this.handleChange}
                />
                {touched &&
                error &&
                <span className="datepicker__error">
            {error}
          </span>}
            </div>
 */