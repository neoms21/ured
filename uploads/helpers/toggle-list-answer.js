export default function(
  state,
  listName,
  toggleField,
  answer,
  deletedListItems,
  currentValues
) {
  let newFields = {},
    listFields = {};

  const listContainerFields = Object.keys(state.fields).filter(
    f => state.fields[f].fields !== undefined
  );

  listContainerFields.forEach(lf => {
    let arr = [];
    for (let i = 0; i < deletedListItems.length; i++) {
      let x = { fields: {}, entityId: state[lf][i].entityId };
      state.fields[lf].fields.forEach(field => {
        const prop = `${field}${i + 1}`;
        x = {
          ...x,
          fields: {
            ...x.fields,
            [prop]: {
              ...state.schema[field],
              value: state[lf][i].fields[prop].value,
              key: prop
            }
          }
        };
      });

      arr.push(x);
    }
    listFields = { ...listFields, [lf]: arr };
  });

  Object.keys(state.fields).forEach(fieldName => {
    newFields = {
      ...newFields,
      [fieldName]: {
        ...state.fields[fieldName],
        value: currentValues[fieldName]
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

  return { ...state, fields: { ...newFields }, ...listFields };
}
