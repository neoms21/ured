import {FETCH_ACCOUNTANT_SUCCESS, SAVE_ACCOUNTANT_SUCCESS} from "./accountant-action-types";
import {assignFields, assignValuesToFields} from "../../reducers-helper";

const initialState = {

    fieldNames: [],
    dataLoaded: false,
    fields: {}
};

export default function about(state = initialState, action = '') {
    switch (action.type) {
        case FETCH_ACCOUNTANT_SUCCESS: {
            return assignFields(state, action);
        }
        case SAVE_ACCOUNTANT_SUCCESS: {
            return assignValuesToFields(state, action);
        }
        default:
            return state;
    }


}