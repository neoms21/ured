import { connect } from "react-redux";
import PortfolioRisk from "./portfolio-risk";
import { setActiveTrackerItem } from "../../../actions/actions";
import HOCForm from "./../../common/hoc/hoc-form";
import { reduxForm, getFormSyncErrors, getFormValues } from "redux-form";
import { fetchPortfolioRisk, savePortfolioRisk } from "./actions";
import { getInitialValues } from "./../../selectors/values-selector";

const PAGE_KEY = "portfolio-risk";

const mapStateToProps = state => ({
  showTracker: state.tracker.showTracker,
  loadComplete: state.portfolioRisk.dataLoaded && state.refData.riskReturn,
  fields: state.portfolioRisk.fields,
  riskReturns: state.refData.riskReturn,
  initialValues: getInitialValues(state, "portfolioRisk"),
  riskReturn: riskReturnText(
    state.refData.riskReturn,
    state.portfolioRisk.riskReturn
  ),
  errors: getFormSyncErrors(PAGE_KEY)(state),
  formValues: getFormValues(PAGE_KEY)(state)
});

const mapDispatchToProps = dispatch => {
  dispatch(setActiveTrackerItem(PAGE_KEY));
  return {
    // setTracker: () => dispatch(setActiveTrackerItem(PAGE_KEY)),
    fetchPortfolioRisk: () => dispatch(fetchPortfolioRisk(PAGE_KEY)),
    saveForm: values => dispatch(savePortfolioRisk({ ...values }, PAGE_KEY))
  };
};

const riskReturnText = (returns, riskReturn) => {
  if (!returns || !riskReturn) return "";

  
  const selectedRisk = returns.find(r => r.id === riskReturn);
  return selectedRisk ? selectedRisk.risk.toLowerCase() : "";
};

const portfolioRiskContainer = reduxForm({
  form: PAGE_KEY,
  enableReinitialize: true
})(HOCForm(PortfolioRisk, PAGE_KEY, "/invesetment-mandata/reporting"));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(portfolioRiskContainer);
