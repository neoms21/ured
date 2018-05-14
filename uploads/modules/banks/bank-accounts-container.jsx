import { connect } from "react-redux";
import { setSubHeader } from "../../actions/actions";
import HOCWithoutForm from "./../common/hoc/hoc-without-form";
import BankAccounts from "./bank-accounts";
import { reduxForm, getFormValues } from "redux-form";
import { formValueSelector } from "redux-form";
import fetchAccounts, {
  selectDisplayFields,
  addBankAccount,
  removeBankAccount
} from "./bank-accounts-actions";
import { getListInitialValues } from "./../selectors/values-selector";
import { fetchRefData } from "./../../actions/actions";
import getCurrenciesSelector from "../selectors/getCurrenciesSelector";

const PAGE_KEY = "accounts";

const mapStateToProps = state => ({
  showTracker: state.tracker.showTracker,
  loadComplete: state.accounts.dataLoaded,
  // fields: state.accounts.fields,
  accounts: state.accounts.accounts,
  initialValues: getListInitialValues(state, PAGE_KEY, "accounts"),
  currencies: getCurrenciesSelector(state.refData.currencies),
  formValues: getFormValues(PAGE_KEY)(state),
 // displayFields: state.accounts.displayFields,
  relatedFields: state.accounts.relatedFields,
  maxRepeats: state.accounts.maxRepeats,
  reps: state.accounts.repetitions
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAccounts: currencies =>
      dispatch(fetchAccounts("bank-accounts-1", currencies)),
    fetchRefData: () => dispatch(fetchRefData(["currencies"])),
    selectDisplayFields: (currencies, currencyId, isUkAccount, index) => {
      dispatch(selectDisplayFields(currencies, currencyId, isUkAccount, index));
    },
    setSubHeader: () => {
      dispatch(setSubHeader("Bank accounts, advisers and third parties"));
    },
    addBankAccount: (currentValues, currencies) => dispatch(addBankAccount(currentValues, currencies)),
    removeBankAccount: (index, currentValies) =>
      dispatch(removeBankAccount(index, currentValies))
  };
};

const selector = formValueSelector(PAGE_KEY);

const BankAccountsContainer = reduxForm({
  form: PAGE_KEY,
  enableReinitialize: true
})(HOCWithoutForm(BankAccounts, PAGE_KEY, "/dashboard/"));

export default connect(mapStateToProps, mapDispatchToProps)(
  BankAccountsContainer
);
