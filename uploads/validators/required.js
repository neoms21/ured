export const required = (value, msg) => {
  const valToValidate = value ? value.toString().trim() : value;
  return valToValidate || valToValidate === 0 ? undefined : msg;
};

export const nada = () => undefined;
