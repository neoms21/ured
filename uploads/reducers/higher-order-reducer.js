import { FETCH_REVIEW_SUCCESS } from "../modules/wizard/wizard-action-types";



const higherOrderReducer = (reducer, reviewField) => (state, action = {}) => {
  const nextState = reducer(state, action);
  switch (action.type) {
    case FETCH_REVIEW_SUCCESS: {
      let newFields = {};

      Object.keys(state.fields).forEach(fieldName => {
        newFields = {
          ...newFields,
          [fieldName]: {
            ...mapField(state, fieldName, action.payload)
          }
        };
      });
      console.log({ ...state, fields: newFields });
      return { ...state, fields: newFields };
    }
    default:
      return nextState;
  }
};

function mapField(state, key, fieldToUpdate) {
  if (key === fieldToUpdate) {
    return { ...state.fields[key], inReview: true };
  }

  return { ...state.fields[key] };
}

export default higherOrderReducer;
