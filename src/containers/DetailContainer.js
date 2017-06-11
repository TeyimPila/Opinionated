import React, {Component} from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getPerson} from '../actions/PersonActions'

import MyForm from "../components/MyForm";

class DetailContainer extends Component {


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
                <h3>Details View</h3>
                <MyForm initialValues={person} readonly={true}/>
                <Link to="/">Home</Link> {' '}
                {person && <Link to="/edit/{person.ID}">Edit</Link>}
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
