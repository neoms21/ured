import { connect } from "react-redux";

import { getReview } from "./wizard-thunks";
import Wizard from "./wizard";

const mapStateToProps = state => ({
  current: state.wizard.currentFieldPosition,
  totalFields: state.wizard.missingFields.length
});

const mapDispatchToProps = dispatch => {
  return {
    getReview: size => dispatch(getReview())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Wizard);
