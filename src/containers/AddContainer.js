/**
 * Author : Steve Bond
 * Date   : 01/01/2018
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { addPerson } from "../actions/PersonActions";

import MyForm from "../components/MyForm";
import ShowValues from "../components/ShowValues";

class AddContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0
    };
  }

  onSave = values => {
    this.props.addPerson(values).then(person => {
      this.props.history.push("/edit/" + person.ID);
    });
  };

  fmt = dt => {
    var yyyy = dt.getFullYear();
    var mm = dt.getMonth() < 9 ? "0" + (dt.getMonth() + 1) : dt.getMonth() + 1; // getMonth() is zero-based
    var dd = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
    return ""
      .concat(yyyy)
      .concat("-")
      .concat(mm)
      .concat("-")
      .concat(dd);
  };

  render = () => {
    const created = new Date();
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const fields = {
      ID: 0,
      FirstName: "",
      LastName: "",
      Email: "",
      Solo: false,
      StartDate: this.fmt(now),
      Age: 0,
      Notes: "",
      Gender: "Male",
      Plane: "",
      Created: created,
      Licence: "Restricted"
    };

    return (
      <div className="well well-sm">
        <h3>This form allows one to add a new member to the system</h3>
        <p>
          Note also how the entire form is passed into the ShowValues page via
          state
        </p>
        <p>including the validation and warning message arrays ...</p>
        <MyForm
          initialValues={fields}
          onSubmit={this.onSave}
          onDelete={() => {}}
          adding={true}
        />

        <hr />

        <ShowValues />

        <hr />
        <h4>
          <Link to="/">Home</Link>
        </h4>
      </div>
    );
  };
}

AddContainer.propTypes = {
  addPerson: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    addPerson: bindActionCreators(addPerson, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddContainer);
