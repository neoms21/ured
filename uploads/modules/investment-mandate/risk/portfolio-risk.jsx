import React, { Component } from "react";
import styles from "./portfolio-risk.scss";
import FormRiskField from "../../../components/redux-form-fields/form-risk-field";
import Notification from "../../common/notification/notification";

class InvestmentService extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: {}
    };
  }

  componentDidMount() {
    if (!this.props.loadComplete) {
      this.props.fetchPortfolioRisk();
    }
  }

  notification = text => {
   
    return (
      <div>
        {" "}
        Your selected <span>overall</span> risk is:{" "}
        <span> {text}</span>
      </div>
    );
  };

  render() {
    const { loadComplete, fields, formValues, riskReturn } = this.props;
    
    return (
      <div className={styles.container}>
        <h2>Portfolio investment risk</h2>

        <h4>
          Please select which of the following most accurately reflects your
          views toward risk and return for <span>this Portfolio</span>
        </h4>

        {loadComplete &&
          formValues && (
            <div>
              {riskReturn && (
                <div id="notification" className={styles.notification}>
                  <Notification
                    isLight={true}
                    children={this.notification(riskReturn)}
                  />
                </div>
              )}

              <FormRiskField
                fields={fields}
                fieldName="portfolioRiskReturn"
                items={this.props.riskReturns}
                selectedItem={fields.portfolioRiskReturn.value}
              />
            </div>
          )}
      </div>
    );
  }
}

export default InvestmentService;
