import { connect } from "react-redux";
import InvestmentService from "./investment-service";

import { setActiveTrackerItem } from "../../../actions/actions";
import HOCForm from "./../../common/hoc/hoc-form";
import {
  reduxForm,
  getFormSyncErrors,
  getFormValues,
} from "redux-form";
import { fetchRefData } from "./../../../actions/actions";
import {
  fetchInvestmentService,
  toggleCustody,
  saveInvestmentServices
} from "./investment-service-actions";
import { hidePages, showPages } from "../../tracker/tracker-actions";
import getCurrenciesSelector from "../../selectors/getCurrenciesSelector";
import { getInitialValues } from "./../../selectors/values-selector";

const PAGE_KEY = "investment-service";

const mapStateToProps = state => ({
  showTracker: state.tracker.showTracker,
  loadComplete: state.investmentServices.dataLoaded,
  fields: state.investmentServices.fields,
  portfolioTypes: state.investmentServices.lists.portfolioTypes,
  currencies: getCurrenciesSelector(state.investmentServices.lists.currencies),
  portfolioTimeHorizons: state.investmentServices.lists.portfolioTimeHorizons,
  objectives: state.investmentServices.objectives,
  otherSelected: state.investmentServices.otherSelected,
  custody: state.investmentServices.custody,
  selectedObjectives: state.investmentServices.objStrings,
  initialValues: getInitialValues(state, "investmentServices"),
  errors: getFormSyncErrors(PAGE_KEY)(state),
  formValues: getFormValues(PAGE_KEY)(state),
});

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem(PAGE_KEY)),
  fetchRefData: () =>
    dispatch(
      fetchRefData(["currencies", "portfolioTypes", "portfolioTimeHorizons"])
    ),
  fetchServices: () => dispatch(fetchInvestmentService(PAGE_KEY)),
  hidePages: () => dispatch(hidePages(["investment-risk", "portfolio-choice"])),
  showPages: () => dispatch(showPages()),
  toggleCustodyAnswer: (formValues, hasCustodian) => dispatch(toggleCustody(formValues, hasCustodian)),
  saveForm: values => dispatch(saveInvestmentServices({ ...values }, PAGE_KEY))
});


const investmentServicesContainer = reduxForm({
  form: PAGE_KEY,
  enableReinitialize: true
})(
  HOCForm(
    InvestmentService,
    PAGE_KEY,
    "/invesetment-mandata/reporting"
  )
);

export default connect(mapStateToProps, mapDispatchToProps)(
  investmentServicesContainer
);
