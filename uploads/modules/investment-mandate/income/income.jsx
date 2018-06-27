import React, { Component } from "react";
import styles from "./income.scss";
import YesNo from "../../common/yes-no";
import FormRadioControl from "../../../components/redux-form-fields/form-radiogroup-field";
import RFSelectField from "../../../components/redux-form-fields/form-select-field";
import RegularPayment from "./regular-payment";

import BorderButton from "../../../modules/common/buttons/border-button";
import FormTextArea from "../../../components/redux-form-fields/form-textarea-field";

class PortfolioIncome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: {}
    };
  }

  componentDidMount() {
    if (!this.props.loadComplete) {
      this.props.fetchPortfolioIncome();
    }
    if (!this.props.accountsLoaded) {
      this.props.fetchBankAccounts();
    }
  }

  renderRegularPayments = () => {
    return this.props.portfolioRegularPayments.map((r, i) => (
      <RegularPayment
        key={`regPayment-${i}`}
        fields={r.fields}
        options={this.props.paymentSources}
        bankAccounts={this.props.bankAccounts}
        frequencies={this.props.frequencies}
        onRemoveClick={() => this.removeRegularPayment(i + 1)}
        index={i + 1}
        showSource={this.props.formValues["portfolioIncomeSeparate"]}
        showAdd={i + 1 < this.props.maxRepeats}
      />
    ));
  };

  addRegularPayment = () => {
    this.props.addRegularPayment(this.props.formValues);
  };

  removeRegularPayment = index => {
    this.props.removeRegularPayment(index, this.props.formValues);
  };

  handleRequirementsChange = item => {
    this.props.toggleIncomeSeparate(item.id, this.props.formValues);
  };

  render() {
    const {
      loadComplete,
      fields,
      formValues,
      manageOptions,
      bankAccounts,
      showAdd
    } = this.props;
    return (
      <div className={styles.container}>
        <h2>Income and payment requirements</h2>

        {loadComplete &&
          formValues && (
            <div>
              <YesNo fields={fields} fieldName="portfolioIncomeRequired" />
              <YesNo
                fields={fields}
                fieldName="portfolioIncomeSeparate"
                onSelect={this.handleRequirementsChange}
              />

              {formValues["portfolioIncomeSeparate"] && (
                <div className={styles["income-container"]}>
                  <FormRadioControl
                    fields={fields}
                    options={manageOptions}
                    fieldName="portfolioManageIncome"
                    onChange={this.handleChange}
                  />

                  <div className={styles.message}>
                    Income will be paid in the Portfolio’s base currency, except
                    where multi currency accounts are specifically agreed with
                    us.
                  </div>
                  <div className={styles["message-bold"]}>
                    Important: Clients requiring high levels of income should
                    note that within asset classes there may be a preference for
                    higher-yielding investments and some low yielding assets may
                    be avoided altogether, to the possible detriment of capital
                    growth.
                  </div>
                  {formValues["portfolioManageIncome"] &&
                    formValues["portfolioManageIncome"].toString() === "2" && (
                      <div className="row">
                        <RFSelectField
                          fields={fields}
                          classNames="col-md-10 col-lg-8 col-sm-12 col-xs-12"
                          fieldName="portfolioManageIncomeBankAccountId"
                          options={bankAccounts}
                          labelKey="value"
                          valueKey="id"
                        />
                      </div>
                    )}
                </div>
              )}
              {formValues["portfolioIncomeSeparate"] !== undefined && (
                <YesNo fields={fields} fieldName="portfolioWithdrawals" />
              )}

              {this.props.portfolioRegularPayments &&
                this.renderRegularPayments()}
              {showAdd && (
                <BorderButton
                  id="addRegularPayment"
                  type="button"
                  text="Add another regular payment"
                  onClick={this.addRegularPayment}
                />
              )}

              <YesNo
                fields={fields}
                fieldName="portfolioOtherIncomeRequirements"
                onSelect={item =>
                  this.props.toggleIncomeRequirements(
                    item.id,
                    this.props.formValues
                  )
                }
              />

              {formValues["portfolioOtherIncomeRequirements"] && (
                <FormTextArea
                  fields={fields}
                  fieldName="portfolioOtherIncomeRequirementsDetail"
                />
              )}
            </div>
          )}
      </div>
    );
  }
}

export default PortfolioIncome;
