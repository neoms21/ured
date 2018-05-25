import { fetchFields, saveFields } from "../../../actions/actions";
import {
    FETCH_CHOICE_FAILED,
    FETCH_CHOICE_SUCCESS,
    SAVE_CHOICE_FAILED,
    SAVE_CHOICE_SUCCESS
} from "./portfolio-choice-action-types";

export function fetchPortfolioChoice(key) {
    return fetchFields(key, FETCH_CHOICE_SUCCESS, FETCH_CHOICE_FAILED);
}

export function savePortfolioChoice(data, page) {
    return saveFields(
        { data, page },
        SAVE_CHOICE_SUCCESS,
        SAVE_CHOICE_FAILED,
        "/investment-mandate/reporting"
    );
}
