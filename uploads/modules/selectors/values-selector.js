import { createSelector } from "reselect";
import { parseForDisplay } from "../../utils/fields-processor";

export const getInitialValues = (state, key) =>
  createSelector(() => {
    const fields = state[key].fields;
    const loadComplete = state[key].dataLoaded;
    //const fieldNames = state[key].fieldNames;
    let result = {};

    if (!loadComplete) return result;
    const keys = Object.keys(fields);

    keys.forEach(f => {
      result = {
        ...result,
        [f]: parseForDisplay(fields[f].type, fields[f].value)
      };
    });

    return result;
  })(state);

export const getListInitialValues = (state, stateName, listKey) =>
  createSelector(() => {
    let fields = {};
    state[stateName][listKey].forEach(item => {
      fields = { ...fields, ...item.fields };
    });

    const loadComplete = state[stateName].dataLoaded;
    //const fieldNames = state[key].fieldNames;
    let result = {};

    if (!loadComplete) return result;
    const keys = Object.keys(fields);

    keys.forEach(f => {
      result = {
        ...result,
        [f]: parseForDisplay(fields[f].type, fields[f].value)
      };
    });

    return result;
  })(state);
