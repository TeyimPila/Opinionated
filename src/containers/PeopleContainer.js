/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */


import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

import { peopleSearch } from '../actions/PeopleActions';
import PeopleResults from "../components/PeopleResults";
import PeopleForm from "../components/PeopleForm";
import Loading from "../components/Loading";
import Error from "../components/Error";

const PeopleContainer = (props) => {

    const getPeople = (vals) => {
        props.peopleSearch(vals)

    }
    const {isFetching, error, people} = props;
    return (
        <div className="well well-sm">

            <h3>This form allows one to search for members based on partial First or Last Name ...</h3>

            <PeopleForm onSubmit={getPeople}/>

            {isFetching && <Loading /> }

            {error && <Error msg={error.message} /> }

            {people.length > 0 && <PeopleResults people={people}/> }

            <hr/>
            <h4><Link to="/">Home</Link></h4>
        </div>
    );
}

PeopleContainer.propTypes = {
    peopleSearch: PropTypes.func.isRequired,
    people: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        people: state.people.people,
        isFetching: state.people.isFetching,
        error: state.people.error,
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

