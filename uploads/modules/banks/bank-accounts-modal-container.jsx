import { connect } from "react-redux";
import HocForm from "./../common/hoc/hoc-form";
import BankAccounts from "./bank-accounts";
import { reduxForm, getFormValues, getFormSyncErrors } from "redux-form";
import fetchAccounts, {
  selectDisplayFields,
  saveBankAccounts
} from "./bank-accounts-actions";

import { getListInitialValues } from "./../selectors/values-selector";
import { fetchRefData } from "./../../actions/actions";
import getCurrenciesSelector from "../selectors/getCurrenciesSelector";
import listsFieldsSelector from "./../selectors/lists-fields-selector";

const PAGE_KEY = "accounts";

const mapStateToProps = state => ({
  loadComplete: state.accounts.dataLoaded,
  fields: listsFieldsSelector(
    state.accounts.bankAccounts.filter(a => !a.delete)
  ),
  displayFields: state.accounts.displayFields,
  accounts: state.accounts.bankAccounts.filter(a => !a.delete),
  schema: state.accounts.schema,
  restrictedFields: state.accounts.restrictedFields,
  allAccounts: state.accounts.bankAccounts,
  currencies: getCurrenciesSelector(state.refData.currencies),
  formValues: getFormValues(PAGE_KEY)(state),
  maxRepeats: state.accounts.maxRepeats,
  reps: state.accounts.repetitions,
  errors: getFormSyncErrors(PAGE_KEY)(state),
  showAdd: false,
  title: "Add a bank account"
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
})(HocForm(BankAccounts, PAGE_KEY, ""));

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(BankAccountsContainer);
