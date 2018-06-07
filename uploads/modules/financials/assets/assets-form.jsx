import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./assets.scss";
import FormTextArea from "../../../components/redux-form-fields/form-textarea-field";
import CurrencyFormField from "../../../components/redux-form-fields/currency-field";

class Assets extends Component {
  componentDidMount() {
    this.props.setTracker();
    if (!this.props.loadComplete) {
      this.props.fetchAssets(this.props.fieldNames);
    }
  }

  renderField = fieldName => (
    <CurrencyFormField fields={this.props.fields} fieldName={fieldName} />
  );

  render() {
    const { fields, loadComplete } = this.props;
    return (
      <div>
        <h2 className={styles.heading}>Income, outgoing and assets</h2>

        <p>
          Tell us about your personal and financial circumstances, this
          information helps us to understand more about your wealth to assess
          your suitability for our services
        </p>

        {loadComplete && (
          <div>
            {this.renderField("annualIncome")}
            <FormTextArea fields={fields} fieldName="sourceOfIncome" />
            {this.renderField("annualOutgoings")}
            {this.renderField("valueOfMainResidence")}
            {this.renderField("mortgageOfMainResidence")}
            {this.renderField("valueOfOtherProperty")}
            {this.renderField("mortgageOfOtherProperty")}
          </div>
        )}
      </div>
    );
  }
}

Assets.propTypes = {
  handleSubmit: PropTypes.func,
  fetchAssets: PropTypes.func,
  saveAssets: PropTypes.func,
  fields: PropTypes.object,
  loadComplete: PropTypes.bool
};

Assets.defaultProps = {
  handleSubmit: undefined,
  fields: {},
  loadComplete: false,
  fetchAssets: undefined,
  saveAssets: undefined
};

export default Assets;
