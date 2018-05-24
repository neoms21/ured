import React, { Component } from "react";
import formStyles from "../../../sass/forms.scss";

import styles from "../wealth.scss";
import common from "../../../sass/common.scss";

import Icon from "../../../components/font-awesome/Icon";

import Objectives from "../../../components/redux-form-fields/form-objectives";
import BigButtons from "../../../components/redux-form-fields/form-big-buttons-field";

import FormTextArea from "../../../components/redux-form-fields/form-textarea-field";
import TextField from "../../../components/redux-form-fields/Textfield";
import YesNo from "../../common/yes-no";

class WealthObjectives extends Component {

  componentDidMount() {
    this.props.setTracker();
    if (!this.props.loadComplete) {
      this.props.fetchObjectives();
    }
  }

  handleWealthServiceClick = value => {
    this.setState({
      requiredWealthService: value,
      dirty: true
    });
  };

  handleAdviceClick = obj => {
    this.setState({
      advised: obj.id,
      dirty: true
    });
  };

  render() {
    const { objectives, fields, formValues } = this.props;

    return (
      <div className={styles.container}>
        <h2>Your wealth planning objectives</h2>
        {this.props.loadComplete && (
          <div>
            <Objectives
              items={objectives}
              fieldName="wealthPlanningObjectives"
              fields={this.props.fields}
              errorText="Please enter wealth objective"
            />

            <h2 className={common["form-sub-heading"]}>
              Our wealth planning charges
            </h2>

            <p className={styles.para}>
              Please see the{" "}
              <span className={common.underline}>Services and costs</span>{" "}
              <Icon iconName="external-link-alt" /> document for charges related
              to our wealth planning service. This document is also available in
              the documents section of this application portal.
            </p>

            <BigButtons
              items={[
                { id: true, value: "On-going wealth planning advice" },
                { id: false, value: "One-off advice" }
              ]}
              fields={fields}
              fieldName="requiredWealthService"
              selectedItem={fields["requiredWealthService"].value}
            />

            <h2 className={common["form-sub-heading"]}>
              Your existing or previous planning arrangements
            </h2>
            <div className={`col-12 ${formStyles["label-container"]}`}>
              <label>
                Have you received wealth planning or financial planning advice
                in the past, or do you have an existing adviser?
              </label>
            </div>

            <YesNo fields={fields} fieldName="hasWealthAdvice" />

            {formValues &&
              formValues["hasWealthAdvice"] && (
                <div>
                  <div className="row">
                    <TextField
                      isDate={true}
                      classNames="col-md-7 col-lg-7 col-xs-12"
                      placeholder="    /    /"
                      fields={this.props.fields}
                      fieldName="lastWealthAdviceDate"
                    />
                    <span
                      className={`col-lg-12 col-md-12 ${formStyles.hintText}`}
                    >
                      DD/MM/YYYY
                    </span>
                  </div>
                  <FormTextArea
                    fields={this.props.fields}
                    fieldName="wealthAdviserName"
                  />
                </div>
              )}
          </div>
        )}
      </div>
    );
  }
}

export default WealthObjectives;
