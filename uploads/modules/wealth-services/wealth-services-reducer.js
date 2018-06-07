import {
  FETCH_WEALTH_SUCCESS,
  SAVE_WEALTH_SUCCESS,
  TOGGLE_INCLUSION,
  TOGGLE_FINANCIAL_ADVICE
} from "./wealth-services-action-types";
import {
  assignFields,
  assignValuesToFields,
  selectObjectives
} from "../reducers-helper";
import objectives from "../../utils/objectives";

const initialState = {
  fieldNames: [],
  fields: {},
  objectives: objectives,
  dataLoaded: false
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_WEALTH_SUCCESS: {
      const newState = assignFields(state, action);

      return {
        ...newState,
        objectives: newState.fields["wealthPlanningObjectives"]
          ? selectObjectives(
              newState,
              newState.fields["wealthPlanningObjectives"].value
            )
          : newState.objectives
      };
    }

    case SAVE_WEALTH_SUCCESS: {
      const assignedState = assignValuesToFields(state, action);

      return {
        ...assignedState,
        objectives: assignedState.fields["wealthPlanningObjectives"]
          ? selectObjectives(
              assignedState,
              assignedState.fields["wealthPlanningObjectives"].value
            )
          : assignedState.objectives
      };
    }

    case TOGGLE_INCLUSION: {
      const newIncludeValue = action.payload.answer;
      return {
        ...state,
        fields: {
          ...state.fields,
          includeWealthPlanning: {
            ...state.fields["includeWealthPlanning"],
            value: newIncludeValue
          },
          confirmWealthPlanning: {
            ...state.fields["confirmWealthPlanning"],
            value:
              newIncludeValue === false
                ? undefined
                : state.fields["confirmWealthPlanning"].value,
            delete: newIncludeValue === false ? true : undefined
          }
        }
      };
    }
    case TOGGLE_FINANCIAL_ADVICE: {
      const { formValues, answer } = action.payload;
      let newFields = {};

      Object.keys(state.fields).forEach(fieldName => {
        newFields = {
          ...newFields,
          [fieldName]: {
            ...state.fields[fieldName],
            value: formValues[fieldName]
          }
        };
      });

      const newAdviceValue = answer;
      newFields = {
        ...newFields,
        hasWealthAdvice: {
          ...state.fields["lastWealthAdviceDate"],
          value: newAdviceValue
        },
        lastWealthAdviceDate: {
          ...state.fields["lastWealthAdviceDate"],
          value: newAdviceValue
            ? state.fields["lastWealthAdviceDate"].value
            : undefined,
          delete: newAdviceValue ? undefined : true
        },
        wealthAdviserName: {
          ...state.fields["wealthAdviserName"],
          value: newAdviceValue
            ? state.fields["wealthAdviserName"].value
            : undefined,
          delete: newAdviceValue ? undefined : true
        }
      };

      return { ...state, fields: { ...newFields } };
    }

    default:
      return state;
  }
}
