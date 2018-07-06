import { connect } from "react-redux";
import { reduxForm, getFormSyncErrors, getFormValues } from "redux-form";
import { setActiveTrackerItem } from "../../../actions/actions";
import InvestmentsForm from "./investments";
import {
  clearValues,
  fetchInvestments,
  saveInvestments,
  setDirty,
  setPristine,
  clearFields
} from "./investments-actions";
import HOCForm from "./../../common/hoc/hoc-form";
import { getInitialValues } from "../../selectors/values-selector";

const FORM_NAME = "investments";

const mapStateToProps = state => ({
  fields: state.investments.fields,
  loadComplete: state.investments.dataLoaded,
  initialValues: getInitialValues(state, FORM_NAME),
  errors: getFormSyncErrors(FORM_NAME)(state),
  formValues: getFormValues(FORM_NAME)(state),
  showTracker: state.tracker.showTracker,
  formModified: state.investments.formModified
});

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem(FORM_NAME)),
  fetchInvestments: () => dispatch(fetchInvestments(FORM_NAME)),
  saveForm: values => dispatch(saveInvestments(values, FORM_NAME)),
  setDirty: values => dispatch(setDirty(values)),
  setPristine: values => dispatch(setPristine(values)),
  clearFieldValues: fieldNames => {
    console.log(fieldNames);
    return dispatch(clearFields(fieldNames));
  }
});

const investmentsContainer = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(
  HOCForm(InvestmentsForm, FORM_NAME, "/financials/liabilities")
);

export default connect(mapStateToProps, mapDispatchToProps)(
  investmentsContainer
);
