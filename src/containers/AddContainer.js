import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addPerson} from '../actions/PersonActions'

import MyForm from "../components/MyForm";
import ShowValues from "../components/ShowValues";

class AddContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            saved: false,
            id: 0,
        }
    }

    onSave = (values) => {
        //console.log("Save called with values:", JSON.stringify(values, null, 2))
        this.props.addPerson(values)
        this.setState({saved: true})
    }

    fmt = (dt) => {
        var yyyy = dt.getFullYear();
        var mm = dt.getMonth() < 9 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1); // getMonth() is zero-based
        var dd  = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
        return "".concat(yyyy).concat('-').concat(mm).concat('-').concat(dd);
    }

    render = () => {
        const saved = this.state.saved

        const created = new Date()
        const now = new Date()
        now.setHours(0, 0, 0, 0)

        const fields = {
            ID: 0,
            FirstName: '',
            LastName: '',
            Email: '',
            Solo: false,
            StartDate: this.fmt(now),
            Age: 0,
            Notes: '',
            Gender: 'Male',
            Plane: '',
            Created: created,
            Licence: 'Restricted'
        }

        return (
            <div>
                {!saved && <div><MyForm
                    initialValues={fields}
                    onSubmit={this.onSave}
                    onDelete={() => {}}
                    adding={true}
                    />
                    <ShowValues/></div>}
                {saved && <span>Saved successfully</span>}

                <Link to="/">Home</Link>
            </div>
        )
    }
}

AddContainer.propTypes = {
    addPerson: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
    return {
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPerson: bindActionCreators(addPerson, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddContainer);
