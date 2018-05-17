import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "../../../components/redux-form-fields/Textfield";
import YesNo from "../../common/yes-no";
import Address from "../../common/address";
import styles from "../advisers.scss";

class LegalAdviser extends Component {
  componentDidMount() {
    this.props.setTracker();
    if (!this.props.loadComplete) {
      this.props.fetchLegalAdviser();
    }
    if (!this.props.countries) {
      this.props.fetchCountries();
    }
  }

  renderField = fieldName => (
    <TextField fields={this.props.fields} fieldName={fieldName} />
  );

  render() {
    const { fields, loadComplete, haveLegalAdviser, countries } = this.props;

    return <div>
        <h2 className={styles.heading}>Legal adviser</h2>

        {loadComplete && <div>
            <YesNo fields={fields} fieldName="haveLegalAdviser" />

            {haveLegalAdviser && <div className={styles.container}>
                <span className="sub-heading">
                  Provide details of your legal adviser
                </span>
                <div className={styles.fields}>
                  <TextField fields={fields} fieldName="legalAdviserContactName" />
                  <TextField fields={fields} fieldName="legalAdviserCompanyName" />
                  <Address fields={fields} countries={countries} />
                  <TextField fields={fields} fieldName="legalAdviserEmail" />
                </div>
              </div>}
          </div>}
      </div>;
  }
}

LegalAdviser.propTypes = {
  handleSubmit: PropTypes.func,
  fetchLegalAdviser: PropTypes.func,
  saveLegalAdviser: PropTypes.func,
  fields: PropTypes.object,
  loadComplete: PropTypes.bool
};

LegalAdviser.defaultProps = {
  handleSubmit: undefined,
  fields: {},
  loadComplete: false,
  fetchLegalAdviser: undefined,
  saveLegalAdviser: undefined
};

export default LegalAdviser;
