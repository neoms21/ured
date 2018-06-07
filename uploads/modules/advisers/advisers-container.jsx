import { Component } from "react";
import { connect } from "react-redux";
import { setSubHeader } from "../../actions/actions";

export class Advisers extends Component {
  componentDidMount() {
    this.props.setSubHeader();
  }

  render() {
    return this.props.children;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSubHeader: () => {
      dispatch(setSubHeader("Bank accounts, advisers and third parties"));
    }
  };
};

export default connect(undefined, mapDispatchToProps)(Advisers);
