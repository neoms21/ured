import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "../../../components/redux-form-fields/Textfield";
import YesNo from "../../common/yes-no";
import Address from "../../common/address";
import styles from "../advisers.scss";

class Accountant extends Component {
  componentDidMount() {
    this.props.setTracker();
    if (!this.props.loadComplete) {
      this.props.fetchAccountant();
    }
    if (!this.props.countries) {
      this.props.fetchCountries();
    }
  }

  renderField = fieldName => (
    <TextField fields={this.props.fields} fieldName={fieldName} />
  );

  render() {
    const { fields, loadComplete, hasAccountant, countries } = this.props;

    return <div>
        <h2 className={styles.heading}>Accountant</h2>

        {loadComplete && <div>
            <YesNo fields={fields} fieldName="hasAccountant" />

            {hasAccountant && <div className={styles.container}>
                <h4>
                  Provide details of your accountant.
                </h4>
                <div className={styles.fields}>
                  <TextField fields={fields} fieldName="accountantContactName" />
                  <TextField fields={fields} fieldName="accountantCompanyName" />
                  <Address fields={fields} countries={countries} />
                  <TextField fields={fields} fieldName="accountantEmail" />
                </div>
              </div>}
          </div>}
      </div>;
  }
}

Accountant.propTypes = {
  handleSubmit: PropTypes.func,
  fetchAccountant: PropTypes.func,
  saveAccountant: PropTypes.func,
  fields: PropTypes.object,
  loadComplete: PropTypes.bool
};

Accountant.defaultProps = {
  handleSubmit: undefined,
  fields: {},
  loadComplete: false,
  fetchAccountant: undefined,
  saveAccountant: undefined
};

export default Accountant;
