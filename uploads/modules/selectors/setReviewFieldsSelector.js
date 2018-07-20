export default function(fields, reviewFieldName) {
  let newFields = {};

  Object.keys(fields).forEach(fieldName => {
    newFields = {
      ...newFields,
      [fieldName]: {
        ...mapField(fields, fieldName, reviewFieldName)
      }
    };
  });
  return { ...newFields };
}

function mapField(fields, key, fieldToUpdate) {
  if (key === fieldToUpdate) {
    return { ...fields[key], inReview: true };
  }

  return { ...fields[key] };
}
