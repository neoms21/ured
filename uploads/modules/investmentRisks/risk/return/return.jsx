import React, { Component } from "react";
import SubmitGroup from "../../../common/buttons/submit-group";
import styles from "./return.scss";

const levels = {
  "1":
    "I am seeking to keep my capital safe and will accept commensurately lower returns",
  "2":
    "I am willing to accept a limited degree of risk in order to grow my assets in line with inflation over the medium to long term",
  "3":
    "I am willing to accept a moderate degree of risk in order to grow my assets in line with inflation over the medium to long term",
  "4":
    "I am willing to accept a high degree of risk in order to grow my assets in line with inflation over the medium to long term",
  "5":
    "I am seeking to maximise returns and am willing to accept a high degree of risk in order to target this objective"
};

class Return extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: {},
      css: {},
      tooltip: ""
    };
  }

  componentDidMount() {
    this.props.setTracker();

    this.props.fetchReturn();
    if (!this.props.loadComplete) {
      this.props.fetchRefData();
    } else if (this.props.items) {
      this.setStateForIcons(this.props.risk.value, this.props.items);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.risk && nextProps.items) {
      this.setStateForIcons(nextProps.risk.value, nextProps.items);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selected &&
      this[`ref${this.state.selected}`] &&
      prevState.selected !== this.state.selected
    ) {
      this.setState({
        activeTooltipPosition: {
          left: this[`ref${this.state.selected}`].offsetLeft + 50,
          top: -30
        },
        tooltip: ""
      });
    }
  }

  setStateForIcons = (riskId, items, isDirty, css) => {
    let colours = {};
    items.forEach(i => {
      colours[i.id.toString()] = {
        selected: riskId ? i.id.toString() === riskId.toString() : false
      };
    });

    this.setState({
      icons: { ...colours },
      selected: this.anyReturnSelected({ ...colours }),
      dirty: isDirty
    });
  };

  onClick = id => {
    this.setStateForIcons(id, this.props.items, true);
  };

  onMouseEnter = e => {
    // console.log(e.target.id, e.nativeEvent);
    // console.dir(this[`ref${e.target.id}`] );
    if (this.state.selected == e.target.id) return;

    this.setState({
      css: {
        left: this[`ref${e.target.id}`].offsetLeft + 140,
        top: this[`ref${e.target.id}`].offsetParent.offsetTop - 30,
        zIndex: 10000
      },
      tooltip: levels[e.target.id]
    });
  };

  onMouseLeave = e => {
    this.setState({
      tooltip: ""
    });
  };

  submit = () => {
    this.props.saveRiskReturn(this.state.selected);
  };

  anyReturnSelected = icons => {
    let selected = -1;
    Object.keys(icons).forEach(k => {
      if (icons[k].selected) {
        selected = parseInt(k, 0);
        return false;
      }
    });

    return selected;
  };

  renderCircle = id => {
    return (
      <div>
        <div
          id={id}
          className={`${
            this.state.icons[id] && this.state.icons[id].selected
              ? styles["circle-active"]
              : styles.circle
          }`}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          ref={cntr => (this[`ref${id}`] = cntr)}
          onClick={() => this.onClick(id)}
        />
        {this.state.icons[id].selected && (
          <div
            style={{ ...this.state.activeTooltipPosition }}
            className={styles["tooltip-active"]}
          >
            {levels[id]}
          </div>
        )}
      </div>
    );
  };

  render() {
    return (
      <div>
        <h2>Risk and return</h2>
        <h3>
          Select the button on the graph that most reflects your views towards
          risk and return
        </h3>
        {this.props.loadComplete &&
          Object.keys(this.state.icons).length > 0 && (
            <div className={styles.container}>
              {this.state.tooltip && (
                <div style={{ ...this.state.css }} className={styles.tooltip}>
                  {this.state.tooltip}
                </div>
              )}

              <div>
                {" "}
                <div className={styles["graph-container"]}>
                  <div className={styles.yaxis}>
                    <span className={styles.axis}>Maximum</span>
                    <span className={styles.axis}>
                      Materially ahead of inflation
                    </span>
                    <span className={styles.axis}>
                      Marginally ahead of inflation
                    </span>
                    <span className={styles.axis}>In line with inflation</span>
                    <span className={styles.axis}>Lower</span>
                  </div>

                  <div className={styles.data}>
                    <div className={styles.block1}>
                      {this.renderCircle("1")}
                      <div className={styles.diagonal1} />
                    </div>
                    <div className={styles.block2}>
                      {this.renderCircle("2")}
                      <div className={styles.diagonal2} />
                    </div>
                    <div className={styles.block3}>
                      {this.renderCircle("3")}
                      <span className={styles.labelx}>Potential return</span>
                      <span className={styles.labely}>Risk</span>
                      <div className={styles.diagonal3} />
                    </div>
                    <div className={styles.block4}>
                      {this.renderCircle("4")}
                      <div className={styles.diagonal4} />
                    </div>
                    <div className={styles.block5}>
                      {this.renderCircle("5")}
                      <div className={styles.diagonal5} />
                    </div>

                    <div className={styles.diagonal6} />
                  </div>
                </div>
                <div className={styles.xaxis}>
                  <span>Low</span>
                  <span>Limited</span>
                  <span>Moderate</span>
                  <span>High</span>
                  <span>Very high</span>
                </div>
              </div>
            </div>
          )}
        <SubmitGroup
          dirty={this.state.dirty}
          disabled={this.state.selected === -1}
          onSubmitClick={this.submit}
          onSkipClick={() =>
            this.props.history.push("/understanding-risk/risk-attitude")
          }
        />
      </div>
    );
  }
}

export default Return;
