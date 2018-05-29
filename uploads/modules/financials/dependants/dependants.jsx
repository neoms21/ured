import React, { Component } from "react";
import PropTypes from "prop-types";
import SubmitGroup from "../../common/buttons/submit-group";
import Dependant from "./dependant";
import RadioGroupField from "../../../components/fields/radio-group";

import { keys } from "lodash";
import styles from "./dependant.scss";
import BorderButton from "../../../modules/common/buttons/border-button";

class Dependants extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  save = values => {
    this.props.saveForm(values);
  };

  submit = values => {
    this.save(values);
  };

  saveInvalidFormAndContinue = () => {
    this.save(this.props.formValues);
  };

  componentDidMount() {
    this.props.setTracker();
    if (!this.props.loadComplete) {
      this.props.fetchDependants(this.props.fieldNames);
    }

    this.props.fetchListData(["dependantRelationships"]);
  }

  onSelect = val => {
    this.setState({ answer: val });
    if (val) {
      this.addDependant();
    }
  };

  addDependant = () => {
    this.props.addDependant(this.props.formValues);
  };

  removeDependant = index => {
    this.setState({ answer: index === 1 ? undefined : this.state.answer });
    this.props.reset();
    this.props.removeDependant(index, this.props.formValues);
  };

  renderDependantForms = () => {
    return this.props.dependants.map((d, i) => (
      <Dependant
        key={`dependant-${i}`}
        fields={d.fields}
        relationships={this.props.relationships}
        onRemoveClick={() => this.removeDependant(i + 1)}
        index={i + 1}
        showAdd={i + 1 < this.props.maxRepeats}
      />
    ));
  };

  render() {
    const {
      handleSubmit,
      loadComplete,
      dirty,
      dependants,
      showAdd
    } = this.props;
    return (
      <div>
        <h2>Dependants</h2>
        {loadComplete && (
          <form onSubmit={handleSubmit(this.submit)}>
            {(this.state.answer === undefined || this.state.answer === false) &&
              dependants.length === 0 && (
                <div>
                  <RadioGroupField
                    label="Do you have any dependants?"
                    onSelect={this.onSelect}
                    items={[
                      { text: "Yes", value: true },
                      { text: "No", value: false }
                    ]}
                  />
                </div>
              )}

            {this.renderDependantForms()}
            {showAdd &&
              this.state.answer && (
                <div className={styles.submit}>
                  <BorderButton
                    type="button"
                    text="Add another dependant?"
                    onClick={this.addDependant}
                  />
                </div>
              )}
            <SubmitGroup
              dirty={dirty || this.state.answer !== undefined}
              errors={this.props.errors}
              fields={this.props.fields}
              savePartial={this.saveInvalidFormAndContinue}
              clearErrors={() => {
                 this.props.untouch(...keys(this.props.errors));
              }}
              formValues={this.props.formValues}
              onSkipClick={() => this.props.history.push("/dashboard")}
              disabled={
                this.props.showRepeats === 0 && this.state.answer === undefined
              }
              classNames="button-container-temp"
            />
          </form>
        )}
      </div>
    );
  }
}

Dependants.propTypes = {
  handleSubmit: PropTypes.func,
  fetchDependants: PropTypes.func,
  saveDependants: PropTypes.func,
  increaseShowRepeats: PropTypes.func,
  fields: PropTypes.object,
  loadComplete: PropTypes.bool
};

Dependants.defaultProps = {
  handleSubmit: undefined,
  fields: {},
  loadComplete: false,
  fetchDependants: undefined,
  increaseShowRepeats: undefined,
  saveDependants: undefined
};

export default Dependants;
