import { connect } from "react-redux";
import SubHeader from "./sub-header";
import { broadcastWindowSize } from "../tracker/tracker-actions";
import { getReview } from "../wizard/wizard-thunks";

const mapStateToProps = state => ({
  hide: state.subHeader.hideSubHeader,
  showStatus: state.subHeader.showStatus,
  title: state.subHeader.title,
  showTracker: state.tracker.showHeaderTracker,
  percentage: state.dashboard.percentage,
  reviewReady: state.dashboard.percentage > 84
});

const mapDispatchToProps = dispatch => {
  return {
    broadcastWindowSize: size => dispatch(broadcastWindowSize(size)),
    getReview: () => dispatch(getReview())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubHeader);
