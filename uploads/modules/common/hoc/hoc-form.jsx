import React, { Component } from "react";
import ReactDOM from "react-dom";
import SubmitGroup from "./../buttons/submit-group";
import fieldsProcessor from "../../../utils/fields-processor";
import styles from "../../../sass/forms.scss";
import { keys } from "lodash";
import Tracker from "../../tracker/tracker-container";

let HOCForm = (
  FormComponent,
  formName,
  skipPath,
  extraProp,
  disabledProp,
  objToSave
) => {
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
    };

    submit = values => {
      // console.log(values);
      let newValues = { ...values };
      if (objToSave) {
        const res = {};
        res[objToSave.propName] = this.props[objToSave.propValue];
        newValues = { ...newValues, ...res };
      }

      this.save(newValues);
    };

    saveInvalidFormAndContinue = failedFields => {
      let formValues = { ...this.props.formValues };

      failedFields.forEach(f => {
        delete formValues[f];
      });
      this.save(formValues);
    };

    componentDidMount() {
      const element = ReactDOM.findDOMNode(this);
    
      if (element != null) {
        window.scrollTo(0, this.scrollPosition);
      }
    }

    render() {
      const extraPropValue = this.props[extraProp];
      // const disabledPropValue = this.props[disabledProp];
      return (
        <div className={styles.app}>
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
                  <FormComponent {...this.props} />

                  {this.props.loadComplete && (
                    <SubmitGroup
                      dirty={this.props.dirty || extraPropValue}
                      errors={this.props.errors}
                      disabled={!this.props.dirty}
                      clearErrors={() => {
                        this.props.untouch(...keys(this.props.errors));
                      }}
                      fields={this.props.fields}
                      savePartial={this.saveInvalidFormAndContinue}
                      formValues={this.props.formValues}
                      onSkipClick={() => this.props.history.push(skipPath)}
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

export default HOCForm;
