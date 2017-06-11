import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {Label} from "react-bootstrap";

import {getPerson, deletePerson, savePerson} from '../actions/PersonActions'

import MyForm from "../components/MyForm";
import ShowValues from "../components/ShowValues";
import {PEOPLE_ROOT_URL} from '../constants/PeopleConstants'
import {confirm} from '../util/confirm';

class EditContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            id: 0,
        }
    }

    handleSearch = (query) => {
        if (!query) {
            return;
        }
        let url = PEOPLE_ROOT_URL + 'lookup/' + query
        //console.log("URL", url)
        fetch(url, {credentials: 'include'})
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res.json();
            })
            .then(data => {
                this.setState({options: data})
            })
            .catch(error => {
                    console.error(error);
                }
            );
    }

    onSelectionChanged = (selectedItems) => {
        if (selectedItems && selectedItems.length > 0) {

            let sid = parseInt(selectedItems[0].ID, 10)

            if (sid) {
                this.setState({id: sid},
                this.props.getPerson(sid))
            }
        }
    }


    onSave = (values) => {
        //console.log("Save called with values:", JSON.stringify(values, null, 2))
        this.props.savePerson(values)
        this.refs.AsyncTypeahead.getInstance().clear()
        this.setState({id: 0})
    }


    onDelete = () => {
        let id = this.state.id
        if (id) {
            confirm('Are you sure you want to delete Person ID ' + id + '?')
                .then(() => {
                    this.props.deletePerson(id)
                })
                .then( () => {
                    this.setState({id: 0, options: []})
                })
                .then(
                    this.refs.AsyncTypeahead.getInstance().clear()
                )
        }
    }


    render = () => {

        const {person} = this.props;

        return (
            <div>
                <h3>Find & Edit View</h3>
                <Label>Find a Person:</Label>
                <AsyncTypeahead
                    ref="AsyncTypeahead"
                    labelKey="NAME"
                    onSearch={this.handleSearch}
                    onChange={this.onSelectionChanged}
                    options={this.state.options}
                    placeholder="Search for a Person by Partial First or Last Name ..."
                    useCache={false}
                    emptyLabel="No matches found"
                    minLength={3}
                    searchText="Searching..."
                    promptText="Type at least 3 chars to search"
                    renderMenuItemChildren={(option, props, index) => (
                        <div>
                            <span>{option.ID}</span>{' '}
                            <span>{option.NAME}</span>
                        </div>
                    )}
                />

                {person && <div><MyForm
                    initialValues={person}
                    onSubmit={this.onSave}
                    onDelete={this.onDelete}/>

                    <ShowValues/></div>}

                <Link to="/">Home</Link>
            </div>
        )
    }
}

EditContainer.propTypes = {
    getPerson: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired,
    savePerson: PropTypes.func.isRequired,
    person: PropTypes.object,
};

const mapStateToProps = (state) => {
    return {
        person: state.person.person,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPerson: bindActionCreators(getPerson, dispatch),
        deletePerson: bindActionCreators(deletePerson, dispatch),
        savePerson: bindActionCreators(savePerson, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContainer);
