import investmentsReducer from "../../modules/financials/investments/investments-reducer";

import {
    FETCH_INVESTMENTS_SUCCESS,
    SAVE_INVESTMENTS_SUCCESS
} from "../../modules/financials/investments/investments-action-types";

import definitionComposer from "./definition-composer";

export default definitionComposer(
    "investments",
    investmentsReducer,
    FETCH_INVESTMENTS_SUCCESS,
    SAVE_INVESTMENTS_SUCCESS
);
