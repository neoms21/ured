import React, { Component } from "react";
import styles from "./linear-dropdown.scss";
import formStyles from "../../sass/forms.scss";
import { find, take, takeRight } from "lodash";
import Icon from "../../components/font-awesome/Icon";
import Tooltip from "../../components/Tooltip/tooltip";
import PropTypes from "prop-types";

class LinearDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: this.props.items.find(i => i.id === props.selectedItem),
      showHiddenItems: false,
      hiddenListStyle: {
        display: "inline",
        position: "absolute",
        zIndex: 9999
      }
    };
  }

  hiddenList = items => {
    return (
      <div className={styles["hidden-list"]} style={this.state.hiddenListStyle}>
        {items.map((item, index) => (
          <div
            onClick={() => {
              this.selectValue(item);
            }}
            className={styles["hidden-list-item"]}
            key={index}
          >
            {item.value}
          </div>
        ))}
      </div>
    );
  };

  selectValue = item => {
    if (this.props.input) {
      this.props.input.onChange(item.id);
    }

    if (this.props.onSelect) {
      this.props.onSelect(item);
    }

    this.setState({
      showHiddenItems: false,
      selectedItem: item
    });
  };

  showHiddenList = e => {
    // console.log(e.currentTarget,e.currentTarget.getBoundingClientRect());
    // console.log(e.screenY, e.clientY, e.pageY, e.pageX, e.currentTarget.clientX);
    this.setState({
      showHiddenItems: !this.state.showHiddenItems,
      hiddenListStyle: {
        ...this.state.hiddenListStyle,
        top: e.currentTarget.getBoundingClientRect().height,
        left: e.currentTarget.offsetLeft,
        width: e.currentTarget.clientWidth
      }
    });
  };

  renderListItems = items => {
    return items.map((item, index) => (
      <div
        onClick={() => {
          this.selectValue(item);
        }}
        id={`btn-${item.id}`}
        className={`${
          this.state.selectedItem && this.state.selectedItem.id === item.id
            ? styles["list-item-active"]
            : ""
        } ${styles["list-item"]} ${
          index === items.length - 1 ? styles["list-item-last"] : ""
        }`}
        key={index}
      >
        {item.value}
      </div>
    ));
  };

  render() {
    const {
      items,
      itemsToShow,
      label,
      errorText,
      helpText,
      showOther,
      classNames,
      helpClass
    } = this.props;
    const { name } = this.props.input ? this.props.input : "";

    const { touched, error } = this.props.meta ? this.props.meta : {};

    const displayItems = take(items, itemsToShow);
    const hiddenItems = takeRight(items, items.length - itemsToShow);

    return (
      <div className={styles.container} id={name ? name : "linearList"}>
        {label && (
          <div
            className={`col-12 ${helpClass ? styles.position : ""} ${
              formStyles["label-container"]
            }`}
          >
            <label>{label}</label>
            {helpText && (
              <Tooltip
                classNames={helpClass}
                iconName="question-circle"
                text={helpText}
              />
            )}
          </div>
        )}

        <div
          className={`${
            touched && error && error[name] === undefined ? "input-error" : ""
          } ${styles["list-container"]} ${classNames}`}
        >
          {this.renderListItems(displayItems)}

          {this.state.selectedItem &&
            find(displayItems, d => d.id === this.state.selectedItem.id) ===
              undefined && (
              <div
                className={`${styles["list-item-active"]} ${
                  styles["list-item"]
                }`}
              >
                {this.state.selectedItem.value}
              </div>
            )}

          {showOther && (
            <div
              ref={el => (this.otherContainer = el)}
              className={styles["other-list-item"]}
              onClick={this.showHiddenList}
            >
              Other
              <Icon iconName="chevron-down" classNames={styles.chevron} />
            </div>
          )}

          {this.state.showHiddenItems &&
            this.hiddenList(
              this.state.selectedItem
                ? hiddenItems.filter(hi => hi.id !== this.state.selectedItem.id)
                : hiddenItems
            )}
        </div>
        {touched &&
          error &&
          error[name] === undefined && (
            <div className="form-error">{errorText}</div>
          )}
      </div>
    );
  }
}

LinearDropdown.propTypes = {
  items: PropTypes.array,
  itemsToShow: PropTypes.number,
  showOther: PropTypes.bool
};

LinearDropdown.defaultProps = {
  items: [],
  itemsToShow: 3,
  showOther: true
};

export default LinearDropdown;
