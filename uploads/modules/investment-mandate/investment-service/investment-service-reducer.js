import { FETCH_LISTS_SUCCESS } from "../../../actions/action-types";
import {
  FETCH_SERVICE_SUCCESS,
  TOGGLE_CUSTODIAN_ANSWER,
  SAVE_INVESTMENT_SERVICE_SUCCESS
} from "./invesetment-service-action-types";
import {
  assignFields,
  assignValuesToFields,
  selectObjectives
} from "../../reducers-helper";
import objectives from "../../../utils/objectives";

const initialState = {
  fieldNames: [],
  dataLoaded: false,
  fields: {},
  lists: {
    portfolioTypes: [],
    portfolioTimeHorizons: [],
    currencies: []
  },
  objectives: objectives
};

export default function service(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_SERVICE_SUCCESS: {
      let assignedFieldsState = assignFields(state, action);

      if (
        assignedFieldsState.fields["portfolioServiceType"] &&
        !assignedFieldsState.fields["portfolioServiceType"].value
      ) {
        assignedFieldsState = {
          ...assignedFieldsState,
          fields: {
            ...assignedFieldsState.fields,
            portfolioServiceType: {
              ...assignedFieldsState.fields.portfolioServiceType,
              value: "1"
            }
          }
        };
      }
      return {
        ...assignedFieldsState,
        objectives: selectObjectives(
          assignedFieldsState,
          assignedFieldsState.fields["portfolioObjectives"].value
        ),
        custody: assignedFieldsState.fields[
          "requiresAlternativeExternalCustodian"
        ].value
          ? true
          : undefined
      };
    }

    case SAVE_INVESTMENT_SERVICE_SUCCESS: {
      const assignedState = assignValuesToFields(state, action);
      return {
        ...assignedState,
        objectives: selectObjectives(
          assignedState,
          assignedState.fields["portfolioObjectives"].value
        )
      };
    }
    case FETCH_LISTS_SUCCESS: {
      const keys = Object.keys(state.lists);
      const newLists = {};
      keys.forEach(k => {
        newLists[k] = action.payload[k] ? action.payload[k] : state.lists[k];
      });

      return { ...state, lists: newLists };
    }

    case TOGGLE_CUSTODIAN_ANSWER: {
      const { formValues, hasCustodian } = action.payload;
      let newFields = {};

      Object.keys(state.fields)
        .filter(k => k !== "requiresAlternativeExternalCustodian")
        .forEach(fieldName => {
          newFields = {
            ...newFields,
            [fieldName]: {
              ...state.fields[fieldName],
              value: formValues[fieldName]
            }
          };
        });
      const newExternalCustodianValue = hasCustodian;
      newFields = {
        ...newFields,
        requiresAlternativeExternalCustodian: {
          ...state.fields["requiresAlternativeExternalCustodian"],
          value: newExternalCustodianValue
            ? state.fields["requiresAlternativeExternalCustodian"].value
            : undefined,
          delete: newExternalCustodianValue
            ? undefined
            : true
        },
        hasAlternativeExternalCustodian: {
          ...state.fields["hasAlternativeExternalCustodian"],
          value: newExternalCustodianValue
            
        }
      };

      return { ...state, fields: { ...newFields } };
    }

    default:
      return state;
  }
}
