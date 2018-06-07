import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./agreement.scss";
import common from "../../../sass/common.scss";

import Icon from "../../../components/font-awesome/Icon";
import HOCForm from "./../../common/hoc/hoc-form";
import { setActiveTrackerItem } from "../../../actions/actions";
import YesNo from "./../../common/yes-no";
import FormCheckBox from "./../../../components/redux-form-fields/form-checbox-field";

import {
  reduxForm,
  getFormSyncErrors,
  getFormValues
} from "redux-form";

import {
  saveAgreement,
  fetchWealthServicesData,
  toggleInclusion
} from "../wealth-services-actions";
import { getInitialValues } from "../../selectors/values-selector";

const PAGE_KEY = "wealth-services-1";

export class Agreement extends Component {
  componentDidMount() {
    this.props.setTracker();
    if (!this.props.loadComplete) this.props.fetchAgreement();
  }

  handleInclusion = value => {
    console.log(value);
    this.props.toggleInclusion();
  };

  render() {
    const { fields, formValues } = this.props;
    console.log(formValues);
    return (
      <div>
        {this.props.loadComplete && (
          <div className={styles.container}>
            <h2>Our wealth planning services</h2>

            <div className={styles["notification-container"]}>
              <div className={styles.icon}>
                <img src={`images/info.svg`} alt="info" />
              </div>

              <div className={styles.content}>
                <p>
                  You have opted not to receive our wealth planning services.
                </p>
                <YesNo
                  classNames={styles.question}
                  fields={fields}
                  fieldName="includeWealthPlanning"
                  onSelect={this.handleInclusion}
                />
              </div>
            </div>

            <p className={styles.para}>
              Our service proposition is the combination of wealth planning
              advice, through our wealth planning services, investment
              management (discretionary and advisory), investment advice on a
              transaction-by-transaction basis and banking services.{" "}
            </p>
            <p className={styles.para}>
              Our investment advice in respect of this service is independent
              and based on a comprehensive and fair analysis of all products and
              investments.
            </p>
            <p className={styles.para}>
              Our wealth planning services offer strategic advice and guidance
              on the following areas
            </p>

            <ul>
              <li>
                Pension arrangements and retirement planning (e.g. stakeholder
                or personal pension schemes)
              </li>
              <li>Estate planning</li>
              <li>
                Protection for you and your family by way of insurance (e.g.
                life policies)
              </li>
              <li>Tax-efficient structures for holding your wealth</li>
              <li>
                Ancillary advice on investments (e.g. tax efficient investment
                schemes such as VCTs and EISs)
              </li>
            </ul>

            <p className={styles.para}>
              Our wealth planning services are described in our Terms and the
              Services and Costs Disclosure Document.{" "}
            </p>
            <p className={styles.para}>
              If you do not want to receive our wealth planning services, you
              will have narrowed the range of products and investments on which
              we can provide advice to you.
            </p>

            <p className={styles.para}>
              You can view the charges for our wealth planning service in the{" "}
              <span className={common.underline}>Services and costs</span>{" "}
              <Icon iconName="external-link-alt" /> document.
            </p>

            {formValues &&
              formValues.includeWealthPlanning && (
                <FormCheckBox
                  classNames={styles.check}
                  fields={fields}
                  fieldName="confirmWealthPlanning"
                />
              )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showTracker: state.tracker.showTracker,
  loadComplete: state.wealthPlanning.fields["includeWealthPlanning"],
  fields: state.wealthPlanning.fields,
  errors: getFormSyncErrors(PAGE_KEY)(state),
  initialValues: getInitialValues(state, "wealthPlanning"),
  formValues: getFormValues(PAGE_KEY)(state)
});

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem(PAGE_KEY)),
  saveForm: agreement => dispatch(saveAgreement(agreement, PAGE_KEY)),
  fetchAgreement: () => dispatch(fetchWealthServicesData(PAGE_KEY)),
  toggleInclusion: (answer) => dispatch(toggleInclusion(answer))
});

const agreementContainer = reduxForm({
  form: PAGE_KEY,
  enableReinitialize: true
})(HOCForm(Agreement, PAGE_KEY, "/wealth-services/wealth-objectives"));

export default connect(mapStateToProps, mapDispatchToProps)(agreementContainer);
