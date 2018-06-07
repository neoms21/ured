import React, { Component } from "react";
import commonStyles from "../../../../sass/common.scss";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import { required } from "./../../../../validators/required";
import FormRadioControl from "./../../../../components/redux-form-fields/form-radiogroup-field";
import YesNo from "../../../common/yes-no";

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

  handleCashReservesChange = item => {
      this.props.toggleCashReserves(this.props.formValues, item.id); 
  };

  render() {
    const { fields, hasCashResrves, loadComplete } = this.props;
    return (
      <div>
        <h2>Cash reserves</h2>
        {loadComplete && (
          <div>
            <YesNo
              fields={fields}
              fieldName="hasCashForCommitments"
              classNames={commonStyles.help}
            />

            <YesNo
              fields={fields}
              fieldName="hasCashReserves"
              classNames={commonStyles.help}
              onSelect={this.handleCashReservesChange}
            />

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
                onChange={this.handleChange}
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
