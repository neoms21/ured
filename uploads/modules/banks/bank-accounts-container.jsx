import { connect } from "react-redux";
import { setSubHeader } from "../../actions/actions";
import HOCForm from "./../common/hoc/hoc-form";
import BankAccounts from "./bank-accounts";
import { reduxForm, getFormValues } from "redux-form";
import { formValueSelector } from "redux-form";
import fetchAccounts, { selectDisplayFields } from "./bank-accounts-actions";
import { getInitialValues } from "./../selectors/values-selector";
import { fetchRefData } from "./../../actions/actions";
import getCurrenciesSelector from "../selectors/getCurrenciesSelector";

const PAGE_KEY = "accounts";

const mapStateToProps = state => ({
  showTracker: state.tracker.showTracker,
  loadComplete: state.accounts.dataLoaded,
  fields: state.accounts.fields,
  initialValues: getInitialValues(state, PAGE_KEY),
  currencies: getCurrenciesSelector(state.refData.currencies),
  formValues: getFormValues(PAGE_KEY)(state),
  displayFields: state.accounts.displayFields,
  relatedFields: state.accounts.relatedFields
});

const mapDispatchToProps = dispatch => {
  return {
    fetchAccounts: (currencies) => dispatch(fetchAccounts("bank-accounts-1", currencies)),
    fetchRefData: () => dispatch(fetchRefData(["currencies"])),
    selectDisplayFields: (currencies, currencyId, isUkAccount) => {
      dispatch(selectDisplayFields(currencies, currencyId, isUkAccount));
    },
    setSubHeader: () => {
      dispatch(setSubHeader("Bank accounts, advisers and third parties"));
    }
  };
};

const selector = formValueSelector(PAGE_KEY);

const BankAccountsContainer = reduxForm({
  form: PAGE_KEY,
  enableReinitialize: true
})(HOCForm(BankAccounts, PAGE_KEY, "/dashboard/"));

export default connect(mapStateToProps, mapDispatchToProps)(
  BankAccountsContainer
);
