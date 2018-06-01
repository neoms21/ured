import { parseForDisplay } from "../utils/fields-processor";

export const assignFields = (state, action) => {
  let objFields = {};
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

  if (state.entities) {
    state.entities.forEach(e => {
      e.fields.forEach(fieldName => {
        objFields[fieldName] = {
          ...objFields[fieldName],
          value: data[e.name] ? data[e.name][fieldName] : undefined
        };
      });
    });
  }

  return {
    ...state,
    fieldNames: fieldKeys,
    fields: objFields,
    dataLoaded: true,
    schema: schema
  };
};

export const assignValuesToFields = (state, action) => {
  let objFields = {};
  const data = action.payload;
  state.fieldNames.forEach(f => {
    const desconstructedField = { ...state.fields[f] };

    // Just doing it because parse for display takes a field.
    const interim = { ...desconstructedField, value: data[f] };
    objFields = {
      ...objFields,
      [f]: { ...interim, value: parseForDisplay(interim.type, interim.value) }
    };
  });

  if (state.entities) {
    state.entities.forEach(e => {
      e.fields.forEach(fieldName => {
        objFields[fieldName] = {
          ...objFields[fieldName],
          value: data[e.name] ? data[e.name][fieldName] : undefined
        };
      });
    });
  }

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

  const fieldNames = Object.keys(schema).filter(f => {
    return !state.nonListFields || state.nonListFields.indexOf(f) === -1;
  });

  let newFields = { ...state.fields };

  if (state.nonListFields) {
    state.nonListFields.forEach(l => {
      newFields = {
        ...newFields,
        [l]: {
          ...schema[l],
          key: l,
          value: data[l]
        }
      };
    });
  }

  return {
    ...state,
    schema: schema,
    fieldNames: fieldNames,
    fields: { ...newFields },
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

export const addListItem = (state, action, listName, nonListFields) => {
  let resultantList = [];
  const { schema } = state;
  const fieldNames = Object.keys(state.schema).filter(f => {
    return !state.nonListFields || state.nonListFields.indexOf(f) === -1;
  });
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
  const keys = Object.keys(state.schema).filter(
    k => !state.nonListFields || state.nonListFields.indexOf(k) === -1
  );

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

  let newFields = { ...state.fields };
  if (state.nonListFields)
    state.nonListFields.forEach(l => {
      newFields = {
        ...newFields,
        [l]: { ...state.schema[l], value: request[l] }
      };
    });

  return { ...state, [listName]: [...newItems], fields: { ...newFields } };
};

export const selectObjectives = (state, objectiveString) => {
  if (!objectiveString) return [...state.objectives];
  let newObjectives = [];
  const returnedObjectives = objectiveString
    .split(",")
    .map(x => x.trim());

  let processed = [];

  newObjectives = state.objectives.map(s => {
    const isFromList = returnedObjectives.find(
      r => r.toLowerCase() === s.value.toLowerCase()
    );
    if (isFromList) {
      processed.push(s.value.toLowerCase());
    }
    return isFromList
      ? { ...s, selected: true }
      : { ...s, selected: false, value: s.id === "other" ? "" : s.value };
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
  }
  return newObjectives;
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
