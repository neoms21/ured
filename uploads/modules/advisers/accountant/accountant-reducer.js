import {
  FETCH_ACCOUNTANT_SUCCESS,
  SAVE_ACCOUNTANT_SUCCESS
} from "./accountant-action-types";
import { assignFields, assignValuesToFields } from "../../reducers-helper";

const initialState = {
  fieldNames: [],
  dataLoaded: false,
  fields: {},
  entities: [
    {
      name: "accountantAddress",
      fields: [
        "addressLine1",
        "addressLine2",
        "addressCity",
        "addressCounty",
        "addressPostCode",
        "addressCountry"
      ]
    }
  ]
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_ACCOUNTANT_SUCCESS: {
      const assignedFieldsState = assignFields(state, action);

      const { data } = action.payload;

      state.entities.forEach(e => {
        e.fields.forEach(fieldName => {
          assignedFieldsState.fields[fieldName] = {
            ...assignedFieldsState.fields[fieldName],
            value: data[e.name][fieldName]
          };
        });
      });
      
      return assignedFieldsState;
    }
    case SAVE_ACCOUNTANT_SUCCESS: {
      return assignValuesToFields(state, action);
    }
    default:
      return state;
  }
}
