import { some } from "lodash";

const mixedValidator = (value, allValues, props) => {
  if (value) return undefined;

  const anyValueExists = some(
    props.relatedFields.map(a => {
      return allValues[a];
    })
  );

  return anyValueExists
    ? undefined
    : `Please enter either of ${props.relatedFields.join(",")}`;
};

export default mixedValidator;
