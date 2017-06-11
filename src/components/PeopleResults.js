import React from 'react';
import PropTypes from 'prop-types'
import Spinner from 'react-spinner'
import 'react-spinner/react-spinner.css'
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { Link } from 'react-router-dom'


const PeopleResults = (props) => {

    if(!props.isFetching && !props.people) {
        return (
        <div className="well">
            <h3>People Search Results</h3>
            <div>Enter a partial first and/or last name and click Submit</div>
        </div>
        )
    }
    else if(props.isFetching) {
        const style = {
            height: 50,
            width: 50,
            backgroundColor: 'blue'
        };
        return (

            <div className="well">
                <h3>Searching, please wait ...</h3>
                <div style={style}>
                    <Spinner />
                </div>
            </div>
        )
    }
    else {
        const people = props.people

        const columns = [
            {
                Header: 'ID',
                accessor: 'ID',
                width: 40,
                Cell: ({value}) => (<span><Link to={`/details/${value}`}>{value}</Link></span>)
            },
            {
                Header: 'First Name',
                accessor: 'FirstName',
                width: 100,
            },
            {
                Header: 'Last Name',
                accessor: 'LastName',
                width: 100,
            },
            {
                Header: 'Email',
                accessor: 'Email',
                width: 150,
            },
            {
                Header: 'Solo',
                accessor: 'Solo',
                width: 50,
                Cell: ({value}) => (<span>{value ? 'Yes' : 'No'}</span>)
            },
            {
                Header: 'Start Date',
                accessor: 'StartDate',
                width: 100,
            },
            {
                Header: 'Age',
                accessor: 'Age',
                width: 50,
            },
            {
                Header: 'Notes',
                accessor: 'Notes',
                width: 100,
            },
            {
                Header: 'Gender',
                accessor: 'Gender',
                width: 75,
            },
            {
                Header: 'Plane',
                accessor: 'Plane',
                width: 100,
            },
            {
                Header: 'Licence',
                accessor: 'Licence',
                width: 80,
            },
            {
                Header: 'Created',
                accessor: 'Created',
                width: 150,
            },
        ]

        return (
            <div className="well">
                <h3>People Search Results</h3>
                <br/>
                <ReactTable className="-striped"
                            data={people}
                            columns={columns}
                            defaultPageSize={5}

                />
            </div>
        )
    }
}

//<pre>{JSON.stringify(people, null, 2)}</pre>

PeopleResults.propTypes = {
    people: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
};

PeopleResults.defaultProps = {
    people: [],
    isFetching: false
};

export default PeopleResults;
