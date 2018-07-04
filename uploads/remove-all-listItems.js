export default function(state, action, listFieldName, booleanField) {
  const { currentValues } = action.payload;

  let listFields;

  let arr = [];
  for (let i = 0; i < state[listFieldName].length; i++) {
    let x = { fields: {}, entityId: state[listFieldName][i].entityId };
    state.fields[listFieldName].fields.forEach(field => {
      const prop = `${field}${i + 1}`;
      x = {
        ...x,
        fields: {
          ...x.fields,
          [prop]: {
            ...state.schema[field],
            value: currentValues[prop],
            key: prop
          }
        },
        delete: true
      };
    });

    arr.push(x);
  }
  listFields = { ...listFields, [listFieldName]: arr };

  return {
    ...state,
    portfolioRegularPayments: [...arr],
    repetitions: 0,
    fields: {
      ...state.fields,
      portfolioWithdrawals: {
        ...state.fields[booleanField],
        value: false
      }
    }
  };
}
