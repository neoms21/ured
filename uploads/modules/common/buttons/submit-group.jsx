import React, { Component } from "react";
import PrimaryButton from "./primary-button";
import styles from "./buttons.scss";
import BlankButton from "./blank-button";
import submitStyles from "./submit-group.scss";
import Skip from "../submit-group/skip";
import SubmitConfirm from "../submit-group/submit-confirm";

class SubmitGroup extends Component {
  constructor(props) {
    super(props);
    this.state = { showSkip: false, showSubmitConfirm: false };
  }

  skipClick = e => {
    if (this.props.dirty) {
      this.setState({
        showSkip: true,
        top: -51,
        right: 180
      });
    } else {
      this.props.onSkipClick();
    }
  };

  submitClick = e => {
    if (this.props.onSubmitClick) {
      this.props.onSubmitClick();
    } else if (this.props.errors) {
      const keys = Object.keys(this.props.errors);
      this.setState({
        showSkip: false
      });

      if (keys.length !== 0) {
        this.setState({
          showSkip: false,
          showSubmitConfirm: true,
          bottom: 0,
          left: this.containerDiv.getBoundingClientRect().width / 2,
          errorFields: Object.keys(this.props.errors).map(
            f => this.props.fields[f].label
          )
        });
      }
    }
  };

  noClick = clear => {
    this.setState({ showSkip: false, showSubmitConfirm: false });
    if (clear) {
      this.props.clearErrors();
    }
  };

  render() {
    const { classNames, disabled, onSkipClick } = this.props;
    console.log(this.props.errors);
    return (
      <div
        className={submitStyles.container}
        ref={cntr => (this.containerDiv = cntr)}
      >
        {this.state.showSkip && (
          <Skip
            top={this.state.top}
            right={this.state.right}
            onSkipClick={onSkipClick}
            noClick={() => this.noClick(false)}
          />
        )}

        {this.state.showSubmitConfirm && (
          <SubmitConfirm
            errorFields={this.state.errorFields}
            bottom={this.state.bottom}
            submit={this.props.savePartial}
            left={this.state.left}
            close={() => this.noClick(true)}
          />
        )}

        <div className={`${styles["button-container"]} ${classNames}`}>
          <BlankButton
            classNames={styles.skipSubmit}
            type="button"
            id="btnSkip"
            text="Skip for now"
            onClick={this.skipClick}
          />
          <div className={`${styles.chevron}`} />
          <PrimaryButton
            disabled={disabled}
            id="btnSubmit"
            classNames={styles.primary}
            text="Save and continue"
            onClick={this.submitClick}
            type="submit"
          />
        </div>
      </div>
    );
  }
}

export default SubmitGroup;
