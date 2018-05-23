import thirdPartyReducer from "../../modules/advisers/third-party/third-party-reducer";

import {
    FETCH_THIRD_PARTY_SUCCESS,
    SAVE_THIRD_PARTY_SUCCESS
} from "../../modules/advisers/third-party/third-party-action-types";
import definitionComposer from "./definition-composer";

export default definitionComposer(
    "third party",
    thirdPartyReducer,
    FETCH_THIRD_PARTY_SUCCESS,
    SAVE_THIRD_PARTY_SUCCESS
);
