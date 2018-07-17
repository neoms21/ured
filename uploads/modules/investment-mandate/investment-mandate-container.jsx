import React, { Component } from "react";
import { connect } from "react-redux";

import { setSubHeader } from "../../actions/actions";
import { hidePages } from "../tracker/tracker-actions";

export class InvestmentMandate extends Component {
  componentDidMount() {
    this.props.setSubHeader();
    this.hidePages(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.hidePages(nextProps);
  }

  hidePages(obj) {
    if (
      obj &&
      obj.context &&
      obj.context.portfolioServiceType.toString() === "3"
    ) {
      this.props.hidePages();
    }
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

const mapStateToProps = state => ({
  context: state.tracker.context
});

const mapDispatchToProps = dispatch => ({
  setSubHeader: () => {
    dispatch(setSubHeader("Investment mandate"));
  },
  hidePages: () => {
    dispatch(hidePages(["investment-risk", "portfolio-choice"]));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InvestmentMandate);
