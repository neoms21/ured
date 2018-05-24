import React, { Component } from "react";
import styles from "./styles.scss";
import RoundButton from "../../modules/common/buttons/round-button";
import formStyles from "../../sass/forms.scss";
import Tooltip from "../Tooltip/tooltip";
import { replaceInArray } from "../../utils/helper";

export default class Objectives extends Component {
  constructor(props) {
    super(props);

    this.state = {
      objectives: props.items,
      other: getOtherValue(props.items)
    };
  }

  handleClick = id => {
    const existingObjective = this.state.objectives.find(o => o.id === id);
    const newObjectives = replaceInArray(this.state.objectives, "id", id, {
      selected: !existingObjective.selected
    });
    const newState = {
      objectives: newObjectives,
      other: getOtherValue(newObjectives)
    };

    this.props.input.onChange(getSelectedObjectivesString(newState));
    this.setState(newState);
  };

  handleTextareaChange = e => {
    this.props.input.onChange(
      `${getSelectedObjectivesString(this.state)}${e.target.value}`
    );

    this.setState({
      objectives: replaceInArray(this.state.objectives, "id", "other", {
        value: e.target.value
      })
    });
  };

  handleBlur = e => {
    if (!e.target.value) this.props.input.onBlur(e.target.value);
  };

  render() {
    const {
      meta: { touched, error },
      errorText,
      label,
      helpText
    } = this.props;

    return (
      <div>
        <div key="objectives">
          {label && (
            <div className={formStyles["label-container"]}>
              <label className={formStyles.fieldLabel}>{label}</label>
              {helpText && (
                <Tooltip iconName="question-circle" text={helpText} />
              )}
            </div>
          )}
          <div className={styles.items}>
            {this.state.objectives.map((o, index) => (
              <RoundButton
                id={`btn-${o.id}`}
                key={o.id}
                text={o.text}
                selected={o.selected}
                classNames={
                  touched && getObjectivesError(this.state)
                    ? "round-input-error"
                    : ""
                }
                onClick={() => this.handleClick(o.id)}
              />
            ))}

            {touched &&
              getObjectivesError(this.state) && (
                <div className={`form-error`}>{errorText}</div>
              )}
          </div>
        </div>

        {this.state.other && (
          <div className={` ${formStyles["field-container"]}  `}>
            <div className={formStyles["label-container"]}>
              <label className={formStyles.fieldLabel}>Other objectives</label>
            </div>
            <div
              id="other-obj"
              className={`${
                formStyles["currency-container"]
              } col-md-12 col-xs-12 ${
                touched && getOtherObjectiveError(this.state)
                  ? "input-error"
                  : ""
              }`}
            >
              <textarea
                rows={5}
                onChange={this.handleTextareaChange}
                className={`${formStyles["currency-input"]}`}
                onBlur={this.handleBlur}
              />
            </div>
            {touched &&
              getOtherObjectiveError(this.state) && (
                <div className={`form-error`}>{errorText}</div>
              )}
          </div>
        )}
      </div>
    );
  }
}

function getSelectedObjectivesString(state) {
  return state.objectives
    .filter(o => o.selected)
    .map(o => o.value)
    .join(",");
}

function getOtherValue(items) {
  return (
    items.find(i => i.id === "other") &&
    items.find(i => i.id === "other").selected
  );
}

function getObjectivesError(state) {
  const selectedObjectives = state.objectives.filter(o => o.selected);

  return selectedObjectives.length === 0;
}

function getOtherObjectiveError(state) {
  const otherObjective = state.objectives.find(s => s.id === "other");

  return otherObjective && otherObjective.selected && !otherObjective.value;
}
