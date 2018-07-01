export default function(
  state,
  currentValues,
  toggleField,
  answer,
  fieldsToProcess = []
) {
  let newFields = {},
    listFields = {};
  const listContainerFields = Object.keys(state.fields).filter(
    f => state.fields[f].fields !== undefined
  );

  listContainerFields.forEach(lf => {
    let arr = [];
    for (let i = 1; i <= state[lf].filter(l => !l.delete).length; i++) {
      let x = { fields: {}, entityId: state[lf][i - 1].entityId };

      state.fields[lf].fields.forEach(field => {
        const prop = `${field}${i}`;
        const value =
          prop === toggleField
            ? answer
            : currentValues
              ? currentValues[prop]
              : state[lf][i-1].fields[prop].value;
        x = {
          ...x,
          fields: {
            ...x.fields,
            [prop]: {
              ...state.schema[field],
              value: value,
              key: field + i
            }
          }
        };
      });

      arr.push(x);
    }
    listFields = {
      ...listFields,
      [lf]: [...arr, ...state[lf].filter(f => f.delete)]
    };
  });

  Object.keys(state.fields).forEach(fieldName => {
    newFields = {
      ...newFields,
      [fieldName]: {
        ...state.fields[fieldName],
        value: currentValues
          ? currentValues[fieldName]
          : state.fields[fieldName].value
      }
    };
  });

  newFields = {
    ...newFields,
    [toggleField]: {
      ...state.fields[toggleField],
      value: answer
    }
  };
  fieldsToProcess.forEach(f => {
    newFields = {
      ...newFields,
      [f]: {
        ...state.fields[f],
        value: answer ? state.fields[f].value : currentValues[f],
        delete: answer ? undefined : true
      }
    };
  });

  return { ...state, fields: { ...newFields }, ...listFields };
}
