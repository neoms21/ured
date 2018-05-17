import { connect } from "react-redux";
import {
  reduxForm,
  formValueSelector
} from "redux-form";
import { setActiveTrackerItem } from "../../../actions/actions";
import ThirdPartyForm from "./third-party-form";
import { fetchThirdParty, saveThirdParty } from "./third-party-actions";
import HOCForm from "./../../common/hoc/hoc-form";
import { getInitialValues } from "./../../selectors/values-selector";

const FORM_NAME = "third-party";

const mapStateToProps = state => ({
  fields: state.thirdParty.fields,
  loadComplete: state.thirdParty.dataLoaded,
  initialValues: getInitialValues(state, "thirdParty"),
  showTracker: state.tracker.showTracker,
  haveThirdParty: selector(state, "thirdPartyAuthorization"),
});

const selector = formValueSelector(FORM_NAME);

const mapDispatchToProps = dispatch => ({
  setTracker: () => dispatch(setActiveTrackerItem(FORM_NAME)),
  fetchThirdParty: () => dispatch(fetchThirdParty("third-party")),
  saveForm: values => dispatch(saveThirdParty(values, FORM_NAME))
});

const ThirdPartyContainer = reduxForm({
  form: FORM_NAME,
  enableReinitialize: true
})(HOCForm(ThirdPartyForm, FORM_NAME, "/dashboard"));

export default connect(mapStateToProps, mapDispatchToProps)(
  ThirdPartyContainer
);
