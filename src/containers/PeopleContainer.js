import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

import { peopleSearch } from '../actions/PeopleActions';
import PeopleResults from "../components/PeopleResults";
import PeopleForm from "../components/PeopleForm";

const PeopleContainer = (props) => {

    const getPeople = (vals) => {

        //console.log("getPeople", vals)

        props.peopleSearch(vals)

    }

    const {people} = props;
    return (
        <div>
            <PeopleForm onSubmit={getPeople}/>
            <PeopleResults people={people}/>
            <Link to="/">Back</Link>
        </div>
    );
}

PeopleContainer.propTypes = {
    peopleSearch: PropTypes.func.isRequired,
    people: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        people: state.people.people
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        peopleSearch: (vals) => dispatch(peopleSearch(vals)),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PeopleContainer);
