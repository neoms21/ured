import React, { Component } from "react";
import styles from "./styles.scss";
import BorderButton from "../../modules/common/buttons/border-button";
import formStyles from "../../sass/forms.scss";
import Tooltip from "../Tooltip/tooltip";
import { replaceInArray } from "../../utils/helper";

export default class Objectives extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: getItems(props.items, props.selectedItem)
    };
  }

  handleClick = id => {
    const newItems = getItems(this.state.items, id);
    this.setState({ items: newItems });
    this.props.input.onChange(id);
  };

  render() {
    const {
      items,
      meta: { touched, error },
      errorText,
      label,
      helpText
    } = this.props;

    return (
      <div>
        {label && (
          <div className={formStyles["label-container"]}>
            <label className={formStyles.fieldLabel}>{label}</label>
            {helpText && <Tooltip iconName="question-circle" text={helpText} />}
          </div>
        )}
        <div className={styles["big-button-container"]}>
          {this.state.items.map(i => (
            <BorderButton
              key={`btn-${i.id}`}
              text={i.value}
              classNames={`${styles["big-button"]} ${
                touched && getError(this.state) ? "input-error" : ""
              }`}
              selected={i.selected}
              onClick={() => this.handleClick(i.id)}
            />
          ))}
        </div>

        {touched &&
          getError(this.state) && (
            <div className={`form-error`}>{errorText}</div>
          )}
      </div>
    );
  }
}

function getItems(items, selectedId) {
  let newItems = [...items];

  return newItems.map(n => {
    return { ...n, selected: n.id === selectedId };
  });
}

function getError(state) {
  const selectedItem = state.items.find(s => s.selected);

  return selectedItem === undefined;
}
