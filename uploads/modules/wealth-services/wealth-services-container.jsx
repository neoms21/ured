import  { Component } from "react";
import { connect } from "react-redux";

import { setSubHeader } from "../../actions/actions";

export class WealthServices extends Component {
  componentDidMount() {
    this.props.setSubHeader();
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  setSubHeader: () => {
    dispatchProps.dispatch(
      setSubHeader("Wealth planning")
    );
  }
});

export default connect(undefined, mapDispatchToProps, mergeProps)(WealthServices);