import { some } from "lodash";

const conditionalFieldsValidator = (value, allValues, props) => {
  //console.log(props.reps, props.currencies, allValues);

  const ukAccount = allValues[`isUKBankAccount${props.reps}`];
  const bicCode = allValues[`bankBicCode${props.reps}`];
  const abaFedWire = allValues[`bankAbaFedwire${props.reps}`];

  const currency = props.currencies.find(
    c => c.id === allValues[`bankAccountCurrency${props.reps}`]
  );

  if (ukAccount || !currency) return undefined;

  if (!ukAccount) {
    if (currency.currencyCode.toLowerCase() === "eur" && !bicCode)
      return "Mandatory";
    else if (
      currency.currencyCode.toLowerCase() !== "eur" &&
      !bicCode &&
      !abaFedWire
    ) {
      return "Either of BIC or Fedwire is mandatory";
    }
  }

  return undefined;
};

export default conditionalFieldsValidator;
