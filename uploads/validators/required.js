export const required = (value, allValues) => {
  const valToValidate = value ? value.toString().trim() : value;
  return valToValidate || valToValidate === 0 ? undefined : allValues;
};

export const nada = () => undefined;
