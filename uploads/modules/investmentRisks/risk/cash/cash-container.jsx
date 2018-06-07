import { connect } from "react-redux";
import Cash from "./cash";
import { setActiveTrackerItem } from "../../../../actions/actions";
import {
  reduxForm,
  formValueSelector,
  getFormSyncErrors,
  getFormValues
} from "redux-form";
import HOCForm from "./../../../common/hoc/hoc-form";
import { saveCashReserves, fetchRiskData, toggleCashReserves } from "../risk-actions";
import { getInitialValues } from "../../../selectors/values-selector";

const FORM_NAME = "cash";

const mapStateToProps = state => ({
  fields: state.risk.fields,
  loadComplete:
    state.risk.fields.hasCashReserves !== undefined &&
    state.risk.fields.hasCashForCommitments !== undefined,
  showTracker: state.tracker.showTracker,
  hasCashResrves: selector(state, "hasCashReserves"),
  errors: getFormSyncErrors(FORM_NAME)(state),
  formValues: getFormValues(FORM_NAME)(state),
  initialValues: getInitialValues(state, "risk")
});

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem("cash-reserves")),
  saveForm: values => dispatch(saveCashReserves(values, "cash-reserves")),
  fetchCashReserves: values => dispatch(fetchRiskData("cash-reserves")), 
  toggleCashReserves: (formValues, answer) => dispatch(toggleCashReserves(formValues, answer))
});

const selector = formValueSelector(FORM_NAME);

const CashContainer = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(HOCForm(Cash, FORM_NAME, "/dashboard"));

export default connect(mapStateToProps, mapDispatchToProps)(CashContainer);
