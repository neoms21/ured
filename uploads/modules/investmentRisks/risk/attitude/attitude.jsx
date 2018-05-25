import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./attitude.scss";
import SubmitGroup from "../../../common/buttons/submit-group";
import AttitudeMarker from "./attitude-marker";
import { setActiveTrackerItem } from "../../../../actions/actions";
import HOCWithoutForm from "../../../common/hoc/hoc-without-form";
import { saveRiskAttitude, fetchRiskData } from "../risk-actions";
import sliderButton from "../../../../assets/images/slider-button.svg";
import options from "./attitude-options";
const css = {
  transition: "left .1s linear",
  top: "30px",
  zIndex: 99999
};

export class Attitude extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAttitude: props.riskAttitude
        ? props.riskAttitude.value
        : undefined,
      position: "absolute",
      selected: false
    };
  }

  componentDidMount() {
    this.props.setTracker();
    if (!this.props.riskAttitude) {
      this.props.fetchAttitude();
    }
    this.selectDefault();
  }

  componentWillReceiveProps(nextProps) {
    
    if (nextProps.riskAttitude) {
      
      this.setState({
        selectedAttitude: nextProps.riskAttitude
          ? nextProps.riskAttitude.value
          : undefined
      });
    }
  }

  componentDidUpdate() {
    this.selectDefault();
  }

  selectDefault = () => {
    if (this.state.selected) return;
    if (this.ref3 && !this.state.selectedAttitude) {
      this.setStateForSlider(this.ref3.offsetLeft, "3");
    } else if (this.state.selectedAttitude) {
      this.setStateForSlider(
        this[`ref${this.state.selectedAttitude}`].offsetLeft,
        this.state.selectedAttitude
      );
    }
  };

  handleOnChange = e => {
    this.setStateForSlider(
      e.currentTarget.offsetLeft,
      e.currentTarget.id,
      true
    );
  };

  setStateForSlider = (offset, id, isDirty) => {
    this.setState({
      left: offset - 7,
      selected: true,
      selectedAttitude: id,
      dirty: isDirty
    });
  };
  
  submit = () => {
    this.props.saveAttitude(this.state.selectedAttitude);
  };

  step = (id, label) => {
    return (
      <div
        key={id}
        id={id}
        className={`${styles.step}`}
        onClick={this.handleOnChange}
        ref={cntr => (this[`ref${id}`] = cntr)}
      >
        <div id={styles.left} />
        <div className={styles.divider} />
        <span className={styles["stepLabel"]}>{label}</span>
        <div id={styles.right} />
      </div>
    );
  };

  render() {
    const { riskAttitude } = this.props;

    return (
      <div ref={el => (this.lbl = el)}>
        {riskAttitude && (
          <div>
            <h2>Risk attitude</h2>
            <h3>
              Use the slider to select the level that best describes your
              overall attitude to risk…
            </h3>
            <div className={styles.container}>
              <img
                style={{
                  ...css,
                  position: this.state.position,
                  left: this.state.left
                }}
                src="images/slider-button.svg"
                alt="marker"
              />

              <div className={styles.slider}>
                {Object.keys(options).map(k => this.step(k, options[k].label))}
              </div>

              {this.state.selectedAttitude && (
                <div className={styles.attitude}>
                  <h2>{options[this.state.selectedAttitude].label}</h2>
                  <AttitudeMarker
                    heading="Investment Risk"
                    leftLabel="Low"
                    rightLabel="High"
                    gradient={
                      options[this.state.selectedAttitude].gradients.risk
                    }
                  />

                  <AttitudeMarker
                    heading="Preferred investment types"
                    leftLabel="Cash and bonds"
                    rightLabel="Equities and high yield bonds"
                    gradient={
                      options[this.state.selectedAttitude].gradients.investments
                    }
                  />
                  <AttitudeMarker
                    heading="The level of acceptable capital loss to acheive aims"
                    leftLabel="None"
                    rightLabel="Siginificant"
                    gradient={
                      options[this.state.selectedAttitude].gradients.capitalLoss
                    }
                  />
                  <AttitudeMarker
                    heading="Growth expectations compared to inflation"
                    leftLabel="Below"
                    rightLabel="Materially ahead"
                    gradient={
                      options[this.state.selectedAttitude].gradients
                        .expectations
                    }
                  />

                  {options[this.state.selectedAttitude].text.map((t, i) => (
                    <p className={styles.description} key={`desc${i}`}>
                      {t}
                    </p>
                  ))}
                </div>
              )}
            </div>
            <SubmitGroup
              dirty={this.state.dirty}
              disabled={this.state.selected === -1}
              onSubmitClick={this.submit}
              onSkipClick={() =>
                this.props.history.push("/understanding-risk/cash-reserves")
              }
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showTracker: state.tracker.showTracker,
  riskAttitude: state.risk.fields["riskAttitude"]
});

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem("risk-attitude")),
  saveAttitude: attitude =>
    dispatch(saveRiskAttitude({ riskAttitude: attitude }, "risk-attitude")),
  fetchAttitude: () => dispatch(fetchRiskData("risk-attitude"))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  HOCWithoutForm(Attitude)
);
