import React, { Component } from "react";
import commonStyles from "../../../sass/common.scss";
import styles from "./portfolio.scss";
import Slider from "../../../components/redux-form-fields/form-slider-field";
import Choice from "./choice";
import YesNo from '../../common/yes-no';

class PortfolioChoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: {}
    };
  }

  componentDidMount() {
    this.props.setTracker();
    this.props.fetchRefData();
    if (!this.props.loadComplete) {
      this.props.fetchPortfolioChoice();
    }
  }

  render() {
    const { loadComplete, riskLevels, fields, formValues } = this.props;
    console.log(formValues&& formValues["portfolioRiskTolerance"]);
    return (
      <div>
        <h2>Portfolio choice</h2>

        <h3>Your investment objective and associated risk tolerance</h3>
        <p className={commonStyles.paragraph}>
          We have selected the following portfolio based on the information we
          know about you and your requirements. You may select an alternative
          portfolio by choosing a different risk tolerance using the slider
          below.
        </p>
        {loadComplete && (
          <div>
            <Slider
              fields={fields}
              items={riskLevels}
              fieldName="portfolioRiskTolerance"
            />

            <div className={styles.information}>
              <Choice choiceIndex={formValues["portfolioRiskTolerance"]} />
            </div>

            <YesNo fields={fields} fieldName="portfolioMatchesRequirements" />
{/* <YesNo fields={fields} fieldName="" /> */}

          </div>
        )}
      </div>
    );
  }
}

export default PortfolioChoice;
