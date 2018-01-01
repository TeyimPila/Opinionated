import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {Label} from "react-bootstrap";

import {getPerson, deletePerson, savePerson, clearPerson} from '../actions/PersonActions'

import MyForm from "../components/MyForm";
import ShowValues from "../components/ShowValues";
import {PEOPLE_ROOT_URL} from '../constants/PeopleConstants'
import {confirm} from '../util/confirm';
import { stringToDate } from "../util/date-funcs";

class EditContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: [],
            id: 0,
        }
    }

    componentWillMount() {
        let id = this.props.match.params.id
        if (id) {
            this.setState({id}, () => {this.props.getPerson(id)})
        } else {
            this.props.clearPerson()
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.match.params.id !== this.props.match.params.id) {
            let id = nextProps.match.params.id
            if (id) {
                this.setState({id}, () => {this.props.getPerson(id)})
            } else {
                this.props.clearPerson()
            }
        }
    }

    handleSearch = (query) => {
        if (!query) {
            return;
        }
        let url = PEOPLE_ROOT_URL + 'lookup/' + query
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
                this.props.history.push('/edit/' + sid)
            }
        }
    }

    onSave = (values) => {
        let p = {...values}
        if(p.StartDate.indexOf('/') > -1) {
            p.StartDate = stringToDate(values.StartDate, "dd/MM/yyyy", "/")
        }
        this.props.savePerson(p)
    }

    onDelete = () => {
        let id = this.state.id
        if (id) {
            confirm(`Are you sure you want to delete ${this.props.person.FirstName} ${this.props.person.LastName}?`)
                .then(() => {
                    return this.props.deletePerson(id)
                })
                .then( () => {
                    this.refs.AsyncTypeahead.getInstance().clear()
                    this.props.history.push('/edit')
                })
        }
    }

    render = () => {

        const {person} = this.props;
        return (
            <div className="well well-sm">
                <h3>Find & Edit View</h3>
                <p>This form exists to demo the react-bootstrap-typeahead and supporting API/stored procedures</p>
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

                {person && <div className="well well-sm"><MyForm
                    initialValues={person}
                    onSubmit={this.onSave}
                    onDelete={this.onDelete}/>

                    <hr/>

                    <ShowValues/></div>}

                <hr/>
                <h4><Link to="/">Home</Link></h4>
            </div>
        )
    }
}

EditContainer.propTypes = {
    getPerson: PropTypes.func.isRequired,
    deletePerson: PropTypes.func.isRequired,
    savePerson: PropTypes.func.isRequired,
    clearPerson: PropTypes.func.isRequired,
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
        clearPerson: bindActionCreators(clearPerson, dispatch),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditContainer);
