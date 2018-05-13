import reducer from "./bank-accounts-reducer";
import { SELECT_DISPLAY_FIELDS } from "./bank-accounts-action-types";
const currencies = [
  {
    code: "INR",
    currencyCode: "INR",
    countryCode: "IND",
    value: "Indian Rupee",
    id: 4
  },
  {
    code: "GBP",

    currencyCode: "GBP",
    countryCode: "GBR",
    value: "British Pound",
    id: 1
  },
  {
    code: "USD",

    currencyCode: "USD",
    countryCode: "USA",
    value: "American Dollar",
    id: 2
  },
  {
    code: "EUR",

    currencyCode: "EUR",
    countryCode: "EUR",
    value: "Euro",
    id: 3
  }
];
describe("Bank accounts reducer tests", () => {
  it("should show the correct display fields for UK, GBP currency", () => {
    const result = reducer(
      {},
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: true,
          currencyId: 1
        }
      }
    );

    expect(result.displayFields).toEqual([
      "bankAccountProvider",
      "bankAccountName",
      "bankAccountSortCode",
      "bankAccountNumber",
      "bankAccountBuildingSocietyReference",
      "bankAccountIBAN"
    ]);
  });

  it("should show the correct display fields for UK, Non GBP currency", () => {
    const result = reducer(
      {},
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: true,
          currencyId: 2
        }
      }
    );

    expect(result.displayFields).toEqual([
      "bankAccountProvider",
      "bankAccountName",
      "bankAccountSortCode",
      "bankAccountNumber",
      "bankAccountBuildingSocietyReference",
      "bankAccountIBAN",
      "bankBicCode",
      "bankAbaFedwire"
    ]);
  });

  it("should show the correct display fields for Non UK, Euro currency", () => {
    const result = reducer(
      {},
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: false,
          currencyId: 3
        }
      }
    );

    expect(result.displayFields).toEqual([
      "bankAccountProvider",
      "bankAccountName",
      "bankBicCode",
      "bankAccountIBAN"
    ]);
  });

  it("should show the correct display fields for Non UK, USD currency", () => {
    const result = reducer(
      {},
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: false,
          currencyId: 2
        }
      }
    );

    expect(result.displayFields).toEqual([
      "bankAccountProvider",
      "bankAccountName",
      "bankAccountNumber",
      "bankBicCode",
      "bankAbaFedwire"
    ]);
  });
  it("should show the correct display fields for Non UK, Non EURo non USD currency", () => {
    const result = reducer(
      {},
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: false,
          currencyId: 4
        }
      }
    );

    expect(result.displayFields).toEqual([
      "bankAccountProvider",
      "bankAccountName",
      "bankAccountNumber",
      "bankBicCode",
      "bankAbaFedwire",
      "bankAccountIBAN"
    ]);
  });
});
