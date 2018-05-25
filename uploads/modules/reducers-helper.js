import { parseForDisplay } from "../utils/fields-processor";

export const assignFields = (state, action) => {
  let objFields = {};
  let lists = { ...state.lists };
  const { schema, data } = action.payload;

  const fieldKeys = Object.keys(schema);

  fieldKeys.forEach(f => {
    objFields = {
      ...objFields,
      [f]: {
        ...schema[f],
        key: f,
        value: parseForDisplay(schema[f].type, data[f])
      }
    };
  });

  if (state.listNames)
    state.listNames.forEach(l => {
      if (!action.payload[l]) return;

      lists = {
        ...lists,
        [l]: action.payload[l]
      };
    });
  return {
    ...state,
    fieldNames: fieldKeys,
    fields: objFields,
    lists: lists,
    dataLoaded: true,
    schema: schema,
    saved: objFields[state.key] && !!objFields[state.key].value
  };
};

export const assignValuesToFields = (state, action) => {
  let objFields = {};

  state.fieldNames.forEach(f => {
    const desconstructedField = { ...state.fields[f] };

    // Just doing it because parse for display takes a field.
    const interim = { ...desconstructedField, value: action.payload[f] };
    objFields = {
      ...objFields,
      [f]: { ...interim, value: parseForDisplay(interim.type, interim.value) }
    };
  });

  return {
    ...state,
    fields: objFields
  };
};

export const clearField = (state, fieldNames) => {
  let updatedFields = {};

  fieldNames.forEach(f => {
    updatedFields[f] = {
      ...state.fields[f],
      value: undefined,
      deleted: true
    };
  });
  return {
    ...state,
    fields: {
      ...state.fields,
      ...updatedFields
    }
  };
};

export const assignListFields = (state, action, listName, createEmpty) => {
  const { schema, data } = action.payload;

  const repetitions =
    (data[listName] === undefined || data[listName].length === 0) && createEmpty
      ? 1
      : data[listName]
        ? data[listName].length
        : 0;

  const fieldNames = Object.keys(schema);

  return {
    ...state,
    schema: schema,
    fieldNames: fieldNames,
    dataLoaded: true,
    saved: action.payload.complete,
    repetitions: repetitions,
    [listName]: mapItemsFromResponse(
      schema,
      data,
      fieldNames,
      repetitions,
      listName
    )
  };
};

export const addListItem = (state, action, listName) => {
  let resultantList = [];
  const { schema } = state;
  const fieldNames = Object.keys(state.schema);
  const currentValues = { ...action.payload.currentValues };

  const deletedItems = state[listName].filter(l => l.delete);

  deletedItems.forEach(d => {
    const indexOfDeletedItem = state[listName].indexOf(d);

    Object.keys(state.schema).forEach(k => {
      delete currentValues[`${k}${indexOfDeletedItem + 1}`];
    });
  });

  const listToProcess = state[listName].filter(l => !l.delete);

  for (let i = 0; i < listToProcess.length + 1; i++) {
    let objFields = {};
    fieldNames.forEach(f => {
      const key = `${f}${i + 1}`;
      objFields = {
        ...objFields,
        [key]: {
          ...schema[f],
          key: key,
          value: currentValues ? currentValues[key] : undefined
        }
      };
    });

    resultantList.push({ ...listToProcess[i], fields: objFields });
  }

  return {
    ...state,
    repetitions: state.repetitions + 1,
    [listName]: [...resultantList, ...deletedItems]
  };
};

export const removeListItem = (state, action, listName) => {
  let resultantItems = [];

  const { index, currentValues } = action.payload;
  const itemToRemove = state[listName][index - 1];

  state[listName]
    .filter((l, i) => {
      return i > index - 1 && !l.delete;
    })
    .forEach(l => {
      let newFields = {};
      const keys = Object.keys(l.fields);
      const indxToChange = state[listName].indexOf(l);
      keys.forEach(k => {
        const newPropName =
          k
            .split("")
            .reverse()
            .join("")
            .substr(1)
            .split("")
            .reverse()
            .join("") + indxToChange;

        newFields[newPropName] = {
          ...l.fields[k],
          key: newPropName,
          value: currentValues[k]
        };
      });

      resultantItems.push({ ...l, fields: newFields });
    });

  let newItems = [];
  newItems = itemToRemove.entityId
    ? [
        ...state[listName].slice(0, index - 1),
        { ...itemToRemove, delete: true },
        ...resultantItems,
        ...state[listName].filter(l => l.delete)
      ]
    : [
        ...state[listName].slice(0, index - 1),
        ...resultantItems,
        ...state[listName].filter(l => l.delete)
      ];

  return {
    ...state,
    [listName]: newItems,
    repetitions: state.repetitions - 1
  };
};

export const processSaveResponse = (state, action, listName) => {
  const { request, entityIds } = action.payload;
  const keys = Object.keys(state.schema);

  let newItems = [];

  const items = request[listName].filter(r => !r.delete); // we don't need to keep deleted items in state

  items.forEach((a, i) => {
    const entityId = a.entityId ? a.entityId : entityIds[i]; // if it's a new item then existing entityId won't be there

    let item = {};
    keys.forEach(k => {
      const key = `${k}${i + 1}`;
      item[key] = {
        ...state.schema[k],
        value: a[k] === undefined ? undefined : a[k],
        key
      };
      // if any value was present before but made null with recent save.  We need to have undefined becuase of redux-form
    });
    newItems.push({ fields: item, entityId: entityId });
  });

  return { ...state, [listName]: [...newItems] };
};

export const selectObjectives = (state, fieldName) => {
  if (!state.fields[fieldName]) return [...state.objectives];

  let newObjectives = [];
  const returnedObjectives = state.fields[fieldName].value
    ? state.fields[fieldName].value
        .toLowerCase()
        .split(",")
        .map(x => x.trim())
    : [];
  let processed = [];

  newObjectives = state.objectives.map(s => {
    const isFromList = returnedObjectives.find(
      r => r.toLowerCase() === s.value.toLowerCase()
    );
    if (isFromList) {
      processed.push(s.value.toLowerCase());
    }
    return isFromList ? { ...s, selected: true } : s;
  });

  const returned = returnedObjectives
    .map(p => {
      const isFromList = processed.find(
        r => r.toLowerCase() === p.toLowerCase()
      );
      return isFromList ? false : p;
    })
    .filter(r => r);

  if (returned.length > 0) {
    newObjectives = newObjectives.filter(n => n.id !== "other");

    newObjectives.push({
      id: "other",
      value: returned.join(", "),
      text: "Other",
      selected: true
    });

    return newObjectives;
  } else {
    return newObjectives;
  }
};

function mapItemsFromResponse(schema, data, fieldNames, reps, listName) {
  let result = [];

  for (let index = 0; index < reps; index++) {
    result.push({
      fields: {
        ...generateFields(schema, data, fieldNames, index + 1, listName)
      },
      entityId:
        data[listName] && data[listName][index]
          ? data[listName][index].entityId
          : undefined
    });
  }
  return result;
}

function generateFields(schema, data, fieldNames, index, listName) {
  let objFields = {};
  fieldNames.forEach(field => {
    addDynamicField(field, index);
  });

  function addDynamicField(f, i) {
    const key = `${f}${i}`;
    objFields = {
      ...objFields,
      [key]: {
        ...schema[f],
        key: key,
        value:
          data[listName] && data[listName][i - 1]
            ? parseForDisplay(schema[f].type, data[listName][i - 1][f])
            : undefined
      }
    };
  }

  return objFields;
}