import accountantReducer from "../../modules/advisers/accountant/accountant-reducer";
import {
  FETCH_ACCOUNTANT_SUCCESS,
  SAVE_ACCOUNTANT_SUCCESS
} from "../../modules/advisers/accountant/accountant-action-types";

import definitionComposer from "./definition-composer";

export default definitionComposer(
  "accountant",
  accountantReducer,
  FETCH_ACCOUNTANT_SUCCESS,
  SAVE_ACCOUNTANT_SUCCESS,
  {
    fieldNames: [],
    dataLoaded: false,
    fields: {},
    entityName: "accountantAddress",
    entityFieldNames: [
      "addressLine1",
      "addressLine2",
      "addressCity",
      "addressCounty",
      "addressPostCode",
      "addressCountry"
    ]
  }
);
