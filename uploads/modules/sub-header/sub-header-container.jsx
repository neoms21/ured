import { connect } from "react-redux";
import SubHeader from "./sub-header";
import { broadcastWindowSize } from "../tracker/tracker-actions";

const mapStateToProps = state => ({
  hide: state.subHeader.hideSubHeader,
  showStatus: state.subHeader.showStatus,
  title: state.subHeader.title,
  showTracker: state.tracker.showHeaderTracker,
  percentage: state.dashboard.percentage
});

const mapDispatchToProps = dispatch => {
  return {
    broadcastWindowSize: size => dispatch(broadcastWindowSize(size))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubHeader);
