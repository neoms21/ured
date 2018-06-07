import { connect } from "react-redux";
import WealthObjectives from "./wealth-objectives";
import { setActiveTrackerItem } from "../../../actions/actions";
import {
  saveWealth,
  fetchWealthServicesData,
  toggleAdvice
} from "../wealth-services-actions";
import HocForm from "../../common/hoc/hoc-form";
import { reduxForm, getFormSyncErrors, getFormValues } from "redux-form";
import { clearOtherWealthObjective } from "../wealth-services-actions";
import { getInitialValues } from "../../selectors/values-selector";

const PAGE_KEY = "wealth-objectives";
const mapStateToProps = state => ({
  fields: state.wealthPlanning.fields,
  objectives: state.wealthPlanning.objectives,
  loadComplete: state.wealthPlanning.fields["wealthPlanningObjectives"],
  showTracker: state.tracker.showTracker,
  errors: getFormSyncErrors(PAGE_KEY)(state),
  formValues: getFormValues(PAGE_KEY)(state),
  initialValues: getInitialValues(state, "wealthPlanning")
});

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem(PAGE_KEY)),
  saveForm: values => dispatch(saveWealth({ ...values }, PAGE_KEY)),
  clearOtherObjective: () => dispatch(clearOtherWealthObjective()),
  fetchObjectives: () => dispatch(fetchWealthServicesData(PAGE_KEY)),
  toggleAdvice: (formValues, answer) => dispatch(toggleAdvice(formValues, answer))
});

const ObjectivesContainer = reduxForm({
  form: PAGE_KEY,
  enableReinitialize: true
})(HocForm(WealthObjectives, PAGE_KEY, "/dashboard"));

export default connect(mapStateToProps, mapDispatchToProps)(
  ObjectivesContainer
);
