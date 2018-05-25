import { connect } from "react-redux";
import PortfolioChoice from "./portfolio-choice";

import { setActiveTrackerItem } from "../../../actions/actions";
import HOCForm from "./../../common/hoc/hoc-form";
import { reduxForm, getFormSyncErrors, getFormValues } from "redux-form";
import { fetchRefData } from "./../../../actions/actions";
import {
  fetchPortfolioChoice,
  savePortfolioChoice
} from "./portfolio-choice-actions";
import { getInitialValues } from "./../../selectors/values-selector";

const PAGE_KEY = "portfolio-choice";

const mapStateToProps = state => ({
  showTracker: state.tracker.showTracker,
  riskLevels: state.refData["riskLevel"],
  loadComplete: state.choice.dataLoaded && state.refData["riskLevel"],
  fields: state.choice.fields,
  initialValues: getInitialValues(state, "choice"),
  errors: getFormSyncErrors(PAGE_KEY)(state),
  formValues: getFormValues(PAGE_KEY)(state)
});

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem(PAGE_KEY)),
  fetchRefData: () => dispatch(fetchRefData(["riskLevel"])),
  fetchPortfolioChoice: () => dispatch(fetchPortfolioChoice(PAGE_KEY)),
  saveForm: values => dispatch(savePortfolioChoice({ ...values }, PAGE_KEY))
});

const choiceContainer = reduxForm({
  form: PAGE_KEY,
  enableReinitialize: true
})(HOCForm(PortfolioChoice, PAGE_KEY, "/invesetment-mandata/reporting"));

export default connect(mapStateToProps, mapDispatchToProps)(choiceContainer);
