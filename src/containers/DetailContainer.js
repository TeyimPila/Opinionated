import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getPerson} from '../actions/PersonActions'

import ShowResults from "../components/ShowResults";
import MyForm from "../components/MyForm";
import ShowValues from "../components/ShowValues";

// const fmt = function(dt) {
//     var yyyy = dt.getFullYear();
//     var mm = dt.getMonth() < 9 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1); // getMonth() is zero-based
//     var dd  = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
//     return "".concat(yyyy).concat('-').concat(mm).concat('-').concat(dd);
// }
//
// let dt = new Date()
// dt.setHours(0, 0, 0, 0)
// let s = fmt(dt)
//
// let fields = {
//
//     ID: 1,
//     FirstName: "Steve",
//     LastName: "Bond",
//     Email: "aikidoshi@hotmail.com",
//     Solo: 1,
//     StartDate: "2016-12-31",
//     Age: 63,
//     Notes: "Lorem Ipsum here",
//     Gender: "Male",
//     Plane: "Cesna",
//     Night: 1,
//     Created: "2017-06-09",
//
// }


class DetailContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: 0,
        }
    }

    componentWillMount() {

        console.log("componentWillMount", this.props.match.params)

        let id = this.props.match.params.id
        if (id) {
            this.props.getPerson(id)
        }
    }

    render = () => {

        const { person } = this.props;

        if(!person)
            return <div>No person yet</div>

        return (
            <div>
                {JSON.stringify(person, null, 2)}
                <MyForm initialValues={person} onSubmit={ShowResults}/>
                <ShowValues/>
                <Link to="/">Back</Link>
            </div>
        )
    }
}

DetailContainer.propTypes = {
    getPerson: PropTypes.func.isRequired,
    person: PropTypes.object
};

const mapStateToProps = (state) => {
    return {
        person: state.person.person
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPerson: bindActionCreators(getPerson, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailContainer);
