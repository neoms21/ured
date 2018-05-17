import { connect } from "react-redux";
import {
  reduxForm,
  getFormSyncErrors,
  getFormValues,
  formValueSelector
} from "redux-form";
import { setActiveTrackerItem, fetchRefData } from "../../../actions/actions";
import LegalAdviserForm from "./legal-adviser-form";
import { fetchLegalAdviser, saveLegalAdviser } from "./legal-adviser-actions";
import HOCForm from "./../../common/hoc/hoc-form";
import { getInitialValues } from "./../../selectors/values-selector";

const FORM_NAME = "adviser";

const mapStateToProps = state => ({
  fields: state.adviser.fields,
  loadComplete: state.adviser.dataLoaded,
  initialValues: getInitialValues(state, FORM_NAME),
  errors: getFormSyncErrors(FORM_NAME)(state),
  formValues: getFormValues(FORM_NAME)(state),
  showTracker: state.tracker.showTracker,
  haveLegalAdviser: selector(state, "haveLegalAdviser"),
  countries: state.refData.countries
});

const selector = formValueSelector(FORM_NAME);

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem(FORM_NAME)),
  fetchLegalAdviser: () => dispatch(fetchLegalAdviser("legal-adviser")),
  saveForm: values => dispatch(saveLegalAdviser(values, FORM_NAME)),
  fetchCountries: () => dispatch(fetchRefData(["countries"]))
});

const LegalAdviserContainer = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(HOCForm(LegalAdviserForm, FORM_NAME, "/advisers/third-party"));

export default connect(mapStateToProps, mapDispatchToProps)(
  LegalAdviserContainer
);
