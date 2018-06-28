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
  toggleIncomeRequirements,
  toggleRegularPayments
} from "./income-actions";

import { openModal } from "../../body/body-actions";
import getFieldsSelector from "../../selectors/getFieldsSelector";
import BankModal from "../../banks/bank-accounts-modal-container";

const PAGE_KEY = "portfolio-income";

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
  fields: getFieldsSelector(state.portfolioIncome, "portfolioRegularPayments"),
  showAdd:
    state.portfolioIncome.portfolioRegularPayments.filter(a => !a.delete)
      .length > 0 &&
    state.portfolioIncome.portfolioRegularPayments.length <
      state.portfolioIncome.maxRepeats,
  initialValues: getListInitialValues(
    state,
    "portfolioIncome",
    "portfolioRegularPayments"
  ),
  errors: getFormSyncErrors(PAGE_KEY)(state),
  formValues: getFormValues(PAGE_KEY)(state),
  schema: state.portfolioIncome.schema,
  nonListFields: state.portfolioIncome.nonListFields
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
    openModal: () => dispatchProps.dispatch(openModal(BankModal)),
    removeRegularPayment: (index, currentValues) =>
      dispatchProps.dispatch(removeRegularPayment(index, currentValues)),
    removeAllPayments: currentValues =>
      dispatchProps.dispatch(removeAllPayments(currentValues)),
    toggleIncomeSeparate: (answer, currentValues) =>
      dispatchProps.dispatch(toggleIncomeSeparate(answer, currentValues)),
    toggleIncomeRequirements: (answer, currentValues) =>
      dispatchProps.dispatch(toggleIncomeRequirements(answer, currentValues)),
    toggleRegularPayments: (answer, currentValues) =>
      dispatchProps.dispatch(toggleRegularPayments(answer, currentValues))
  };
};

const portfolioIncomeContainer = reduxForm({
  form: PAGE_KEY,
  enableReinitialize: true
})(HOCForm(PortfolioIncome, PAGE_KEY, "/invesetment-mandate/reporting"));

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(portfolioIncomeContainer);
