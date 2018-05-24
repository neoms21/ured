import { connect } from "react-redux";
import Objectives from "./objectives";
import { setActiveTrackerItem } from "../../../../actions/actions";
import {
  saveObjectives,
  toggleObjective,
  clearOtherObjective,
  fetchRiskData
} from "./../risk-actions";
import HocForm from "./../../../common/hoc/hoc-form";
import { reduxForm } from "redux-form";

const PAGE_KEY = "investment-objectives";

const mapStateToProps = state => ({
  fields: state.risk.fields,
  objectives: state.risk.objectives,
  loadComplete: state.risk.fields["investmentObjective"],
  showTracker: state.tracker.showTracker,
  initialValues: {
    otherInvestmentObjective: state.risk.fields["otherInvestmentObjective"]
      ? state.risk.fields["otherInvestmentObjective"].value
      : undefined
  }
});

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem(PAGE_KEY)),
  toggleObjective: id => dispatch(toggleObjective(id)),
  saveForm: values => dispatch(saveObjectives({ ...values }, PAGE_KEY)),
  fetchObjectives: () => dispatch(fetchRiskData(PAGE_KEY))
});

const ObjectivesContainer = reduxForm({
  form: "objectives",
  enableReinitialize: true
})(HocForm(Objectives,"objectives","/"));

export default connect(mapStateToProps, mapDispatchToProps)(
  ObjectivesContainer
);
