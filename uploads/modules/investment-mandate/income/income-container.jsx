import { connect } from "react-redux";
import PortfolioIncome from "./income";
import { setActiveTrackerItem } from "../../../actions/actions";
import HOCForm from "./../../common/hoc/hoc-form";
import { reduxForm, getFormSyncErrors, getFormValues } from "redux-form";
import { getListInitialValues } from "./../../selectors/values-selector";
import fetchAccounts from "../../banks/bank-accounts-actions";
import {
  fetchPortfolioIncome,
  savePortfolioIncome,
  addRegularPayment,
  removeRegularPayment,
  removeAllPayments,
  toggleIncomeSeparate,
  toggleIncomeRequirements
} from "./income-actions";

const PAGE_KEY = "investment-income";

const mapStateToProps = state => ({
  showTracker: state.tracker.showTracker,
  loadComplete: state.portfolioIncome.dataLoaded,
  accountsLoaded: state.portfolioIncome.accountsLoaded,
  portfolioRegularPayments: state.portfolioIncome.portfolioRegularPayments.filter(
    a => !a.delete
  ),
  allRegularPayments: state.portfolioIncome.portfolioRegularPayments,
  bankAccounts: state.portfolioIncome.bankAccounts,
  manageOptions: state.refData.incomeManagementOptions,
  frequencies: state.refData.frequencies,
  paymentSources: state.refData.paymentSources,
  fields: state.portfolioIncome.fields,
  showAdd:
    state.portfolioIncome.portfolioRegularPayments.length <
    state.portfolioIncome.maxRepeats,
  initialValues: getListInitialValues(
    state,
    "portfolioIncome",
    "portfolioRegularPayments"
  ),
  errors: getFormSyncErrors(PAGE_KEY)(state),
  formValues: getFormValues(PAGE_KEY)(state)
});

const mapDispatchToProps = dispatch => {
  dispatch(setActiveTrackerItem(PAGE_KEY));
  return { dispatch };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  //dispatchProps.dispatch(setActiveTrackerItem(PAGE_KEY));
  return {
    ...ownProps,
    ...stateProps,
    fetchBankAccounts: () =>
      dispatchProps.dispatch(fetchAccounts("bank-accounts-1")),
    fetchPortfolioIncome: () =>
      dispatchProps.dispatch(fetchPortfolioIncome(PAGE_KEY)),
    addRegularPayment: values =>
      dispatchProps.dispatch(addRegularPayment(values)),

    saveForm: data =>
      dispatchProps.dispatch(
        savePortfolioIncome(
          data,
          Object.keys(stateProps.schema),
          stateProps.allRegularPayments,
          PAGE_KEY,
          stateProps.nonListFields
        )
      ),

    removeRegularPayment: (index, currentValues) =>
      dispatchProps.dispatch(removeRegularPayment(index, currentValues)),
    removeAllPayments: () => dispatchProps.dispatch(removeAllPayments()),
    toggleIncomeSeparate: (answer, currentValues) =>
      dispatchProps.dispatch(toggleIncomeSeparate(answer, currentValues)),
    toggleIncomeRequirements: (answer, currentValues) =>
      dispatchProps.dispatch(toggleIncomeRequirements(answer, currentValues))
  };
};

const portfolioIncomeContainer = reduxForm({
  form: PAGE_KEY,
  enableReinitialize: true
})(HOCForm(PortfolioIncome, PAGE_KEY, "/invesetment-mandata/reporting"));

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(portfolioIncomeContainer);
