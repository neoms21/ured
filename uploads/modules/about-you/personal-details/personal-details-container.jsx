import { connect } from "react-redux";
import PersonalDetailsForm from "./personal-details";
import { reduxForm, getFormSyncErrors, getFormValues, touch } from "redux-form";
import { setActiveTrackerItem } from "../../../actions/actions";
import refDataLoadedSelector from "../../selectors/ref-data-loaded-selector";

import {
  fetchPersonalInformation,
  savePersonalInformation
} from "./actions/personal-details-actions";
import HOCForm from "../../common/hoc/hoc-form";
import { getInitialValues } from "../../selectors/values-selector";
import { fetchRefData } from "./../../../actions/actions";
import setReviewFieldsSelector from "../../selectors/setReviewFieldsSelector";
import { saveReview } from "../../wizard/wizard-thunks";
import { closeWizard } from '../../wizard/wizard-actions';

const FORM_NAME = "personal";

const mapStateToProps = state => ({
  fields: setReviewFieldsSelector(
    state.personal.fields,
 state.wizard.fieldBeingProcessed
  ),
  loadComplete:
    state.personal.dataLoaded &&
    refDataLoadedSelector(state.refData, [
      "countries",
      "maritalStatuses",
      "titles"
    ]),
  initialValues: getInitialValues(state, FORM_NAME),
  titles: state.refData["titles"],
  countries: state.refData["countries"],
  maritalStatuses: state.refData["maritalStatuses"],
  dateFields: state.personal.dates,
  errors: getFormSyncErrors(FORM_NAME)(state),
  formValues: getFormValues(FORM_NAME)(state),
  showTracker: state.tracker.showTracker,
  reviewField: state.wizard.fieldBeingProcessed
});

const mapDispatchToProps = dispatch => ({
  saveReviewField: field => dispatch(saveReview(field)),
  setTracker: () => dispatch(setActiveTrackerItem(FORM_NAME)),
  closeWizard: () => dispatch(closeWizard()),
  fetchPersonalDetails: () => dispatch(fetchPersonalInformation(FORM_NAME)),
  saveForm: (data, fields) =>
    dispatch(savePersonalInformation(data, fields, FORM_NAME)),
  fetchLists: () =>
    dispatch(fetchRefData(["countries", "maritalStatuses", "titles"])),
});

const PersonalDetailsContainer = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(HOCForm(PersonalDetailsForm, FORM_NAME, "/about-you/address"));

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonalDetailsContainer);
