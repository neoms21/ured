import React, { Component } from "react";
import styles from "./styles.scss";
import RiskItem from "./risk-item";

export default class Objectives extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: getItems(props.items, props.selectedItem)
    };
  }

  componentDidMount = () => {
    this.props.input.onChange(this.props.selectedItem);
  };

  handleClick = id => {
    this.setState({ items: getItems(this.state.items, id) });
    this.props.input.onBlur(id);
    this.props.input.onChange(id);
  };

  render() {
    const {
      input,
      meta: { touched },
      errorText
    } = this.props;

    return (
      <div>
        <div
          className={styles.container}
          {...input}
          onChange={this.onChange}
          onBlur={this.handleBlur}
        >
          {this.state.items.map(i => (
            <RiskItem
              key={`btn-${i.id}`}
              error={getError(this.state)}
              touched={touched}
              {...i}
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
