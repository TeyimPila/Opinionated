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
        <div>
            <PeopleForm onSubmit={getPeople}/>

            {isFetching && <Loading /> }

            {error && <Error msg={error.message} /> }

            {people.length > 0 && <PeopleResults people={people}/> }

            <Link to="/">Home</Link>
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

