import React, { Component } from "react";

import formStyles from "../../sass/forms.scss";
import BankAccount from "./bank-account";

class BankAccounts extends Component {


  componentDidMount() {
    this.props.setSubHeader();

    if (!this.props.currencies || this.props.currencies.length === 0) {
      this.props.fetchRefData();
    }
  }

  addBankAccount = () => {
    this.props.addBankAccount(this.props.formValues, this.props.currencies);
  };

  removeBankAccount = index => {
    this.props.removeBankAccount(index, this.props.formValues);
  };

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.currencies &&
      nextProps.currencies.length > 0 &&
      !nextProps.loadComplete
    ) {
      this.props.fetchAccounts(nextProps.currencies);
    }
  }

  handleCurrencyChange = (item, index) => {
    this.props.selectDisplayFields(
      this.props.currencies,
      item.id,
      this.props.formValues[`isUKBankAccount${index}`],
      index
    );
  };

  handleUKAccountChange = (item, index) => {
    this.props.selectDisplayFields(
      this.props.currencies,
      this.props.formValues[`bankAccountCurrency${index}`],
      item.id,
      index
    );
  };

  render() {
    const {
      currencies,
      accounts,
      loadComplete,
      relatedFields,
      reps
    } = this.props;

    return <div>
        <h2>Bank accounts</h2>
        <p className={formStyles.info}>
          Provide details of the Nominated Account into which you want to
          make payments in relation to your Portfolio. If you want to setup
          payments to different accounts you can add further accounts and
          specify payments to these in the mandates section.
        </p>

        {loadComplete && // <form onSubmit={handleSubmit(this.submit)}>
          <div>
            {accounts.map((a, i) => (
              <BankAccount
                key={`bankAccount${i}`}
                fields={a.fields}
                index={i + 1}
                displayFields={a.displayFields}
                currencies={currencies}
                relatedFields={relatedFields}
                handleCurrencyChange={this.handleCurrencyChange}
                handleUKAccountChange={this.handleUKAccountChange}
                showAdd={
                  i + 1 < this.props.maxRepeats &&
                  accounts.length < this.props.maxRepeats
                }
                onAddClick={this.addBankAccount}
                onRemoveClick={() => this.removeBankAccount(i + 1)}
                repetitions={reps}
              />
            ))}
          </div>}
      </div>;
  }
}

export default BankAccounts;
