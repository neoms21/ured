import { connect } from "react-redux";
import {
  reduxForm,
  getFormSyncErrors,
  getFormValues,
  formValueSelector
} from "redux-form";
import { setActiveTrackerItem, fetchRefData } from "../../../actions/actions";
import AccountantForm from "./accountant-form";
import { fetchAccountant, saveAccountant } from "./accountant-actions";
import HOCForm from "./../../common/hoc/hoc-form";
import { getInitialValues } from "./../../selectors/values-selector";

const FORM_NAME = "accountant";

const mapStateToProps = state => ({
  fields: state.accountant.fields,
  loadComplete: state.accountant.dataLoaded,
  initialValues: getInitialValues(state, FORM_NAME),
  errors: getFormSyncErrors(FORM_NAME)(state),
  formValues: getFormValues(FORM_NAME)(state),
  showTracker: state.tracker.showTracker,
  haveAccountant: selector(state, "haveAccountant"),
  countries: state.refData.countries
});

const selector = formValueSelector(FORM_NAME);

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem(FORM_NAME)),
  fetchAccountant: () => dispatch(fetchAccountant(FORM_NAME)),
  saveForm: values => dispatch(saveAccountant(values, FORM_NAME)),
  fetchCountries: () => dispatch(fetchRefData(["countries"]))
});

const AccountantContainer = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(HOCForm(AccountantForm, FORM_NAME, "/advisers/legal-adviser"));

export default connect(mapStateToProps, mapDispatchToProps)(
  AccountantContainer
);
