import React, { Component } from "react";
import styles from "../../risk.scss";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import LinearDropdown from "../../../../components/fields/linear-dropdown";
import { requiredSelectItem } from "../../../../validators/required_select_value";
import { required } from "./../../../../validators/required";
import FormRadioControl from "./../../../../components/redux-form-fields/form-radiogroup-field";

const items = [
  {
    id: true,
    value: "Yes"
  },
  {
    id: false,
    value: "No"
  }
];

const options = [
  {
    id: "1",
    value:
      "I have external sources of funds and would not expect assets managed by Cazenove Capital to be called upon",
    checked: true
  },
  {
    id: "2",
    value:
      "I have external sources of funds but it is likely the assets managed by Cazenove Capital would be called upon to some extent"
  },
  {
    id: "3",
    value:
      "The assets managed by Cazenove Capital would be called upon in the  first instance"
  }
];

class Cash extends Component {
  componentDidMount() {
    if (!this.props.hasCashReserves) {
      this.props.fetchCashReserves();
    }
    this.props.setTracker();
  }

  render() {
    const { fields, hasCashResrves, loadComplete } = this.props;
    return (
      <div>
        <h2>Cash reserves</h2>
        {loadComplete && (
          <div>
            <div className={styles["field-container"]}>
              <Field
                label={fields["hasCashForCommitments"].label}
                name="hasCashForCommitments"
                showOther={false}
                items={items}
                selectedItem={fields.hasCashForCommitments.value}
                component={LinearDropdown}
                errorText={fields.hasCashForCommitments.validation}
                helpText={fields.hasCashForCommitments.helpText}
                validate={[requiredSelectItem]}
                helpClass={styles.help}
              />
            </div>
            <Field
              label={fields["hasCashReserves"].label}
              name="hasCashReserves"
              items={items}
              showOther={false}
              selectedItem={fields.hasCashReserves.value}
              component={LinearDropdown}
              errorText={fields.hasCashReserves.validation}
              helpText={fields.hasCashReserves.helpText}
              validate={[requiredSelectItem]}
            />

            {/* <FormSortCodeField
              fields={fields}
              fieldName="bankAccountSortCode"
            /> */}

            {hasCashResrves === false && (
              <Field
                name="assetRankForUnexpectedExpenditure"
                component={FormRadioControl}
                label={fields["assetRankForUnexpectedExpenditure"].label}
                errorText={
                  fields["assetRankForUnexpectedExpenditure"].validation
                }
                items={options}
                validate={[required]}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

Cash.propTypes = {
  fields: PropTypes.object,
  loadComplete: PropTypes.bool,
  titles: PropTypes.array
};

Cash.defaultProps = {
  fields: {},
  loadComplete: false,
  titles: []
};

export default Cash;
