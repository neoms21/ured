import { connect } from "react-redux";
import { setSubHeader } from "../../actions/actions";

import HocForm from "./../common/hoc/hoc-form";
import BankAccounts from "./bank-accounts";
import { reduxForm, getFormValues, getFormSyncErrors } from "redux-form";
import fetchAccounts, {
  selectDisplayFields,
  addBankAccount,
  removeBankAccount,
  saveBankAccounts
} from "./bank-accounts-actions";
import { getListInitialValues } from "./../selectors/values-selector";
import { fetchRefData } from "./../../actions/actions";
import getCurrenciesSelector from "../selectors/getCurrenciesSelector";
import listsFieldsSelector from "./../selectors/lists-fields-selector";

const PAGE_KEY = "accounts";

const mapStateToProps = state => ({
  showTracker: state.tracker.showTracker,
  loadComplete: state.accounts.dataLoaded,
  fields: listsFieldsSelector(
    state.accounts.bankAccounts.filter(a => !a.delete)
  ),
  displayFields: state.accounts.displayFields,
  accounts: state.accounts.bankAccounts.filter(a => !a.delete),
  schema: state.accounts.schema,
  restrictedFields: state.accounts.restrictedFields,
  allAccounts: state.accounts.bankAccounts,
  initialValues: getListInitialValues(state, PAGE_KEY, "bankAccounts"),
  currencies: getCurrenciesSelector(state.refData.currencies),
  formValues: getFormValues(PAGE_KEY)(state),
  maxRepeats: state.accounts.maxRepeats,
  reps: state.accounts.repetitions,
  errors: getFormSyncErrors(PAGE_KEY)(state),
  title: "Bank accounts",
  showInfo: true,
  showAdd:
    state.accounts.bankAccounts.filter(a => !a.delete).length <
    state.accounts.maxRepeats
});

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  fetchAccounts: currencies =>
    dispatchProps.dispatch(fetchAccounts("bank-accounts-1", currencies)),
  fetchRefData: () => dispatchProps.dispatch(fetchRefData(["currencies"])),
  selectDisplayFields: (currencies, currencyId, isUkAccount, index) => {
    dispatchProps.dispatch(
      selectDisplayFields(currencies, currencyId, isUkAccount, index)
    );
  },
  setSubHeader: () => {
    dispatchProps.dispatch(
      setSubHeader("Bank accounts, advisers and third parties")
    );
  },
  addBankAccount: (currentValues, currencies) =>
    dispatchProps.dispatch(addBankAccount(currentValues, currencies)),
  removeBankAccount: (index, currentValies) =>
    dispatchProps.dispatch(removeBankAccount(index, currentValies)),
  saveForm: (data, displayFields) =>
    dispatchProps.dispatch(
      saveBankAccounts(
        data,
        Object.keys(stateProps.schema),
        stateProps.allAccounts,
        "bank-accounts-1",
        stateProps.restrictedFields
      )
    )
});

const BankAccountsContainer = reduxForm({
  form: PAGE_KEY,
  enableReinitialize: true
})(HocForm(BankAccounts, PAGE_KEY, "/dashboard/"));

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(BankAccountsContainer);
