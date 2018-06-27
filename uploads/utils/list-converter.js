import { uniq } from "lodash";

export default function converter(
  fields,
  keys,
  stateItems,
  nonListFields,
  listName
) {
  const result = [];
  const iterations = uniq(
    Object.keys(fields)
      .filter(val => (nonListFields ? nonListFields.indexOf(val) === -1 : true)) // skipped the non list fields from collection
      .map(k =>
        k
          .split("")
          .reverse()
          .join("")
          .substr(0, 1)
      )
  ); // Get the number of times list fields are repeated

  let nonListValues = {};

  if (nonListFields)
    nonListFields.forEach(field => {
      nonListValues = { ...nonListValues, [field]: fields[field] };
    });

  iterations.forEach(i => {
    const obj = {};
    if (stateItems[i - 1] && stateItems[i - 1].delete) return;

    keys
      .filter(k => (nonListFields ? nonListFields.indexOf(k) === -1 : true))
      .forEach(k => {
        obj[k] = fields[`${k}${i}`] === undefined ? null : fields[`${k}${i}`];
      });

    if (stateItems[i - 1] && stateItems[i - 1].entityId) {
      obj.entityId = stateItems[i - 1].entityId;
    }
    result.push(obj);
  });

  return {
    ...nonListValues,
    [listName]: [
      ...result,
      ...stateItems
        .filter(s => s.delete && s.entityId)
        .map(s => ({ entityId: s.entityId, delete: true }))
    ]
  };
}
