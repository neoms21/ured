import React, { Component } from "react";
import PropTypes from "prop-types";
import Dependant from "./dependant";
import YesNo from "../../common/yes-no";
import styles from "./dependant.scss";
import BorderButton from "../../../modules/common/buttons/border-button";

class Dependants extends Component {
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
    if (val.id) {
      this.addDependant();
    } else {
      this.props.removeAllDependants();
    }
  };

  addDependant = () => {
    this.props.addDependant(this.props.formValues);
  };

  removeDependant = index => {
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
    const { loadComplete, showAdd, fields } = this.props;

    return (
      <div>
        <h2>Dependants</h2>
        {loadComplete && (
          <div>
            <YesNo
              fields={fields}
              fieldName="hasDependants"
              onSelect={this.onSelect}
            />

            {this.renderDependantForms()}
            {showAdd && (
              <div className={styles.submit}>
                <BorderButton
                  type="button"
                  text="Add another dependant?"
                  onClick={this.addDependant}
                />
              </div>
            )}
          </div>
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
