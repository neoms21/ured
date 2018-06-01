import { connect } from "react-redux";
import {
  reduxForm,
  formValueSelector,
  getFormSyncErrors,
  getFormValues
} from "redux-form";
import { setActiveTrackerItem } from "../../../actions/actions";
import DependantsForm from "./dependants";
import {
  removeDependant,
  fetchDependants,
  addDependant,
  saveDependants,
  removeAllDependants
} from "./dependants-actions";

import { getListInitialValues } from "../../selectors/values-selector";
import getFieldsSelector from "../../selectors/getFieldsSelector";
import { fetchRefData } from "./../../../actions/actions";
import HOCForm from "./../../common/hoc/hoc-form";

const FORM_NAME = "dependants";

const selector = formValueSelector(FORM_NAME);

const mapStateToProps = state => {
  return {
    schema: state.dependants.schema,
    fieldNames: state.dependants.fieldNames,
    fields: getFieldsSelector(state.dependants, "dependants"),
    dependants: state.dependants.dependants.filter(a => !a.delete),
    allDependants: state.dependants.dependants,
    loadComplete: state.dependants.dataLoaded,
    showRepeats: state.dependants.showRepeats,
    maxRepeats: state.dependants.maxRepeats,
    initialValues: getListInitialValues(state, FORM_NAME, "dependants"),
    relationships: state.dependants.relationships,
    currentValues: selector(state, FORM_NAME),
    errors: getFormSyncErrors(FORM_NAME)(state),
    formValues: getFormValues(FORM_NAME)(state),
    showTracker: state.tracker.showTracker,
    showAdd:
      state.dependants.repetitions < state.dependants.maxRepeats &&
      state.dependants.dependants.filter(d => !d.delete).length > 0,
    nonListFields: state.dependants.nonListFields
  };
};

const mapDispatchToProps = dispatch => ({ dispatch });

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  ...stateProps,
  setTracker: () => dispatchProps.dispatch(setActiveTrackerItem(FORM_NAME)),
  fetchDependants: () => dispatchProps.dispatch(fetchDependants("dependants")),
  saveForm: data =>
    dispatchProps.dispatch(
      saveDependants(
        data,
        Object.keys(stateProps.schema),
        stateProps.allDependants,
        FORM_NAME,
        stateProps.nonListFields
      )
    ),
  fetchListData: lists => dispatchProps.dispatch(fetchRefData(lists)),
  addDependant: values => dispatchProps.dispatch(addDependant(values)),
  removeDependant: (index, currentValues) =>
    dispatchProps.dispatch(removeDependant(index, currentValues)),
  removeAllDependants: () => dispatchProps.dispatch(removeAllDependants())
});

const dependantsContainer = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(HOCForm(DependantsForm, FORM_NAME, "/dashbaord"));

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
  dependantsContainer
);
