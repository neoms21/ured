import feesReducer from "../../modules/investment-mandate/fees/fees-reducer"


import definitionComposer from "./definition-composer";
import { FETCH_FEES_SUCCESS, SAVE_FEES_SUCCESS } from './../../modules/investment-mandate/fees/fees-action-types';

export default definitionComposer(
    "fees",
    feesReducer,
    FETCH_FEES_SUCCESS,
    SAVE_FEES_SUCCESS
);
