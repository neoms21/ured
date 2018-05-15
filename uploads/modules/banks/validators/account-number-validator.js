const accountNumberValidator = (value, allValues, props) => {
  //console.log(props.reps, props.currencies, allValues);

  const ukAccount = allValues[`isUKBankAccount${props.reps}`];

  if (ukAccount)
    return /^[0-9]{8}$/g.test(value) ? undefined : "Invalid account number";
  else
    return /^[0-9]{8,16}$/g.test(value) ? undefined : "Invalid account number";
};

export default accountNumberValidator;
