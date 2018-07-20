import React, { Component } from "react";
import SubmitGroup from "./../buttons/submit-group";
import fieldsProcessor from "../../../utils/fields-processor";
import styles from "../../../sass/forms.scss";
import { keys } from "lodash";
import Tracker from "../../tracker/tracker-container";

import { connect } from "react-redux";
import WizardBox from "../../wizard/wizard";

let HOCForm = (FormComponent, formName, skipPath, skipPathFn) => {
  return class extends Component {
    save = values => {
      if (!this.props.fields) {
        this.props.saveForm(values);
      } else {
        this.props.saveForm(
          fieldsProcessor(values, this.props.fields),
          this.props.fields
        );
      }

      if (this.props.clearState) {
        this.props.clearState();
      }
    };

    retriveSkipPath = (path, pathFn) => {
      return path ? path : this.props[pathFn];
    };

    submit = values => {
      this.save(values);
    };

    saveInvalidFormAndContinue = failedFields => {
      let formValues = { ...this.props.formValues };

      failedFields.forEach(f => {
        delete formValues[f];
      });
      this.save(formValues);
    };

    getPosition = ref => {
      const id = `div-${ref}`;

      const element = document.getElementById(id);

      if (!document.getElementById(id)) return {};

      console.log(element.offsetTop, element.height);
      const el = document.getElementById(ref).getBoundingClientRect();
      // return {};
      if (el) {
        // console.log(this[ref].getBoundingClientRect());
        // console.log(this[ref].offsetTop);
        // console.log(this[ref].offsetLeft);

        return {
          top: element.offsetTop + el.height,
          left: element.clientWidth + 50
        };
      }

      return {};
    };

    closeReview = () => {
      this.props.closeReview();
    };

    saveReviewField = () => {
      const { errors, reviewField, formValues } = this.props;
      if (!errors[reviewField]) {
        this.props.saveReviewField({ [reviewField]: formValues[reviewField] });
      }
    };

    render() {
      // console.log(this);
      // const disabledPropValue = this.props[disabledProp];
      return (
        <div className={styles.app}>
          {/* {this.props.reviewField && <div className={styles["wizard-cloak"]} />} */}
          <div className={`${styles.children}`}>
            <div className={`row ${styles.mainContent}`}>
              <div
                className={
                  this.props.showTracker
                    ? "col-lg-7 col-md-8 col-sm-12 col-xs-12"
                    : "col-lg-12 col-md-12 col-sm-12 col-xs-12"
                }
              >
                <form
                  className={styles.form}
                  onSubmit={this.props.handleSubmit(this.submit)}
                >
                  <FormComponent
                    {...this.props}
                    getPosition={this.getPosition}
                  />

                  {this.props.reviewField && (
                    <div
                      style={{
                        ...this.getPosition(this.props.reviewField),
                        position: "absolute",
                        zIndex: 9000000
                      }}
                    >
                      <WizardBox
                        onNextClick={this.saveReviewField}
                        onCloseClick={this.closeWizard}
                      />
                    </div>
                  )}

                  {this.props.loadComplete && (
                    <SubmitGroup
                      dirty={this.props.dirty}
                      errors={this.props.errors}
                      clearErrors={() => {
                        this.props.untouch(...keys(this.props.errors));
                      }}
                      showSkip={
                        this.retriveSkipPath(skipPath, skipPathFn) !== undefined
                      }
                      fields={this.props.fields}
                      savePartial={this.saveInvalidFormAndContinue}
                      formValues={this.props.formValues}
                      onSkipClick={() =>
                        this.props.history.push(
                          this.retriveSkipPath(skipPath, skipPathFn)
                        )
                      }
                    />
                  )}
                </form>
              </div>
              {this.props.showTracker && (
                <div className={`${styles.tracker} col-lg-5 col-md-4`}>
                  <Tracker />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }
  };
};

// const mapStateToProps = (state, ownProps) => {
//   return {
//     reviewField: state.wizard.fieldBeingProcessed
//   };
// };

// export default connect(mapStateToProps)(HOCForm);
export default HOCForm;
