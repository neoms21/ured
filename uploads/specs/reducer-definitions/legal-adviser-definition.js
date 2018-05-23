import legalAdviserReducer from "../../modules/advisers/legal-adviser/legal-adviser-reducer";

import {
  SAVE_LEGAL_ADVISER_SUCCESS,
  FETCH_LEGAL_ADVISER_SUCCESS
} from "../../modules/advisers/legal-adviser/legal-adviser-action-types";
import definitionComposer from "./definition-composer";

export default definitionComposer(
  "legal adviser",
  legalAdviserReducer,
  FETCH_LEGAL_ADVISER_SUCCESS,
  SAVE_LEGAL_ADVISER_SUCCESS
);
