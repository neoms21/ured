import reducer from "./bank-accounts-reducer";
import {
  SELECT_DISPLAY_FIELDS,
  FETCH_ACCOUNTS_SUCCESS,
  SAVE_ACCOUNTS_SUCCESS,
  ADD_BANK_ACCOUNT,
  REMOVE_BANK_ACCOUNT
} from "./bank-accounts-action-types";

const schema = {
  isUKBankAccount: {},
  bankAccountCurrency: {},
  bankAccountProvider: {},
  bankAccountSortCode: {},
  bankAccountName: {},
  bankAccountBuildingSocietyReference: {},
  bankAccountNumber: {},
  bankAccountIBAN: {}
};
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
  it("should return default state", () => {
    expect(reducer()).toEqual({
      bankAccounts: [],
      dataLoaded: false,
      displayFields: [],
      fieldNames: [],
      fields: {},
      maxRepeats: 2,
      restrictedFields: ["isUKBankAccount", "bankAccountCurrency"]
    });
  });

  it("should show no fields if currency doesn't match", () => {

    const result = reducer(
      { bankAccounts: [{ fields: {} }] },
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: true,
          currencyId: 100,
          index: 1
        }
      }
    );

    expect(result).toEqual({
      bankAccounts: [
        {
          displayFields: [
            
          ],
          fields: {}
        }
      ]
    });
  });

  it("should show the correct display fields for UK, GBP currency", () => {
    const result = reducer(
      { bankAccounts: [{ fields: {} }] },
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: true,
          currencyId: 1,
          index: 1
        }
      }
    );

    expect(result).toEqual({
      bankAccounts: [
        {
          displayFields: [
            "bankAccountProvider",
            "bankAccountName",
            "bankAccountSortCode",
            "bankAccountNumber",
            "bankAccountBuildingSocietyReference",
            "bankAccountIBAN"
          ],
          fields: {}
        }
      ]
    });
  });

  it("should show the correct display fields for UK, Non GBP currency", () => {
    const result = reducer(
      { bankAccounts: [] },
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: true,
          currencyId: 2,
          index: 1
        }
      }
    );

    expect(result.bankAccounts[0].displayFields).toEqual([
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
      { bankAccounts: [] },
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: false,
          currencyId: 3
        }
      }
    );

    expect(result.bankAccounts[0].displayFields).toEqual([
      "bankAccountProvider",
      "bankAccountName",
      "bankBicCode",
      "bankAccountIBAN"
    ]);
  });

  it("should show the correct display fields for Non UK, USD currency", () => {
    const result = reducer(
      { bankAccounts: [] },
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: false,
          currencyId: 2
        }
      }
    );

    expect(result.bankAccounts[0].displayFields).toEqual([
      "bankAccountProvider",
      "bankAccountName",
      "bankAccountNumber",
      "bankBicCode",
      "bankAbaFedwire"
    ]);
  });

  it("should show the correct display fields for Non UK, Non EURo non USD currency", () => {
    const result = reducer(
      { bankAccounts: [] },
      {
        type: SELECT_DISPLAY_FIELDS,
        payload: {
          currencies: currencies,
          isUkBankAccount: false,
          currencyId: 4
        }
      }
    );

    expect(result.bankAccounts[0].displayFields).toEqual([
      "bankAccountProvider",
      "bankAccountName",
      "bankAccountNumber",
      "bankBicCode",
      "bankAbaFedwire",
      "bankAccountIBAN"
    ]);
  });

  it("should select default value for currency and uk bank account question", () => {
    const result = reducer(
      {},
      {
        type: FETCH_ACCOUNTS_SUCCESS,
        payload: {
          accounts: {
            data: {},
            schema: {
              isUKBankAccount: {},
              bankAccountCurrency: {},
              bankAccountProvider: {},
              bankAccountSortCode: {},
              bankAccountName: {},
              bankAccountBuildingSocietyReference: {},
              bankAccountNumber: {},
              bankAccountIBAN: {}
            }
          },
          currencies: currencies
        }
      }
    );

    expect(result).toEqual({
      dataLoaded: true,
      bankAccounts: [
        {
          fields: {
            isUKBankAccount1: { key: "isUKBankAccount1", value: true },
            bankAccountCurrency1: { key: "bankAccountCurrency1", value: 1 },
            bankAccountProvider1: {
              key: "bankAccountProvider1",
              value: undefined
            },
            bankAccountName1: { key: "bankAccountName1", value: undefined },
            bankAccountSortCode1: {
              key: "bankAccountSortCode1",
              value: undefined
            },
            bankAccountNumber1: {
              key: "bankAccountNumber1",
              value: undefined
            },
            bankAccountBuildingSocietyReference1: {
              key: "bankAccountBuildingSocietyReference1",
              value: undefined
            },
            bankAccountIBAN1: {
              key: "bankAccountIBAN1",
              value: undefined
            }
          },
          displayFields: [
            "bankAccountProvider",
            "bankAccountName",
            "bankAccountSortCode",
            "bankAccountNumber",
            "bankAccountBuildingSocietyReference",
            "bankAccountIBAN"
          ],
          entityId: undefined
        }
      ],

      currencies: currencies,
      fieldNames: [
        "isUKBankAccount",
        "bankAccountCurrency",
        "bankAccountProvider",
        "bankAccountSortCode",
        "bankAccountName",
        "bankAccountBuildingSocietyReference",
        "bankAccountNumber",
        "bankAccountIBAN"
      ],
      saved: undefined,
      schema: {
        isUKBankAccount: {},
        bankAccountCurrency: {},
        bankAccountProvider: {},
        bankAccountName: {},
        bankAccountSortCode: {},
        bankAccountBuildingSocietyReference: {},
        bankAccountNumber: {},
        bankAccountIBAN: {}
      },
      repetitions: 1
    });
  });

  it("should map the accounts if present in response", () => {
    const result = reducer(
      {},
      {
        type: FETCH_ACCOUNTS_SUCCESS,
        payload: {
          accounts: {
            data: {
              bankAccounts: [
                {
                  isUKBankAccount: true,
                  bankAccountCurrency: 1
                },
                {
                  isUKBankAccount: false,
                  bankAccountCurrency: 2
                }
              ]
            },
            schema: {
              isUKBankAccount: {},
              bankAccountCurrency: {},
              bankAccountProvider: {},
              bankAccountSortCode: {},
              bankAccountName: {},
              bankAccountBuildingSocietyReference: {},
              bankAccountNumber: {},
              bankAccountIBAN: {}
            }
          },
          currencies: currencies
        }
      }
    );

    expect(result.bankAccounts[0].displayFields).toEqual([
      "bankAccountProvider",
      "bankAccountName",
      "bankAccountSortCode",
      "bankAccountNumber",
      "bankAccountBuildingSocietyReference",
      "bankAccountIBAN"
    ]);
    expect(result.bankAccounts[1].displayFields).toEqual([
      "bankAccountProvider",
      "bankAccountName",
      "bankAccountNumber",
      "bankBicCode",
      "bankAbaFedwire"
    ]);
  });

  it("should update the state after save", () => {
    const result = reducer(
      { schema: schema, repetitions: 1, currencies: currencies },

      {
        type: SAVE_ACCOUNTS_SUCCESS,
        payload: {
          request: {
            bankAccounts: [{ isUKBankAccount: true, bankAccountCurrency: 1 }]
          },
          entityIds: ["1", "2"]
        }
      }
    );

    expect(result).toEqual({
      bankAccounts: [
        {
          entityId: "1",
          fields: {
            bankAccountBuildingSocietyReference1: {
              key: "bankAccountBuildingSocietyReference1",
              value: undefined
            },
            bankAccountCurrency1: {
              key: "bankAccountCurrency1",
              value: 1
            },
            bankAccountIBAN1: { key: "bankAccountIBAN1", value: undefined },
            bankAccountName1: { key: "bankAccountName1", value: undefined },
            bankAccountNumber1: { key: "bankAccountNumber1", value: undefined },
            bankAccountProvider1: {
              key: "bankAccountProvider1",
              value: undefined
            },
            bankAccountSortCode1: {
              key: "bankAccountSortCode1",
              value: undefined
            },
            isUKBankAccount1: { key: "isUKBankAccount1", value: true }
          },
          displayFields: [
            "bankAccountProvider",
            "bankAccountName",
            "bankAccountSortCode",
            "bankAccountNumber",
            "bankAccountBuildingSocietyReference",
            "bankAccountIBAN"
          ]
        }
      ],
      currencies: currencies,
      repetitions: 1,
      schema: {
        bankAccountBuildingSocietyReference: {},
        bankAccountCurrency: {},
        bankAccountIBAN: {},
        bankAccountName: {},
        bankAccountNumber: {},
        bankAccountProvider: {},
        bankAccountSortCode: {},
        isUKBankAccount: {}
      }
    });
  });

  it("should add a new acocunt", () => {
    const result = reducer(
      { schema: schema, bankAccounts: [{}], repetitions: 1 },
      {
        type: ADD_BANK_ACCOUNT,
        payload: { currencies: currencies, accounts: { currentValues: {} } }
      }
    );

    expect(result).toEqual({
      bankAccounts: [
        {
          fields: {
            bankAccountBuildingSocietyReference1: {
              key: "bankAccountBuildingSocietyReference1",
              value: undefined
            },
            bankAccountCurrency1: {
              key: "bankAccountCurrency1",
              value: undefined
            },
            bankAccountIBAN1: { key: "bankAccountIBAN1", value: undefined },
            bankAccountName1: { key: "bankAccountName1", value: undefined },
            bankAccountNumber1: { key: "bankAccountNumber1", value: undefined },
            bankAccountProvider1: {
              key: "bankAccountProvider1",
              value: undefined
            },
            bankAccountSortCode1: {
              key: "bankAccountSortCode1",
              value: undefined
            },
            isUKBankAccount1: { key: "isUKBankAccount1", value: undefined }
          }
        },
        {
          displayFields: [
            "bankAccountProvider",
            "bankAccountName",
            "bankAccountSortCode",
            "bankAccountNumber",
            "bankAccountBuildingSocietyReference",
            "bankAccountIBAN"
          ],
          fields: {
            bankAccountBuildingSocietyReference2: {
              key: "bankAccountBuildingSocietyReference2",
              value: undefined
            },
            bankAccountCurrency2: { key: "bankAccountCurrency2", value: 1 },
            bankAccountIBAN2: { key: "bankAccountIBAN2", value: undefined },
            bankAccountName2: { key: "bankAccountName2", value: undefined },
            bankAccountNumber2: { key: "bankAccountNumber2", value: undefined },
            bankAccountProvider2: {
              key: "bankAccountProvider2",
              value: undefined
            },
            bankAccountSortCode2: {
              key: "bankAccountSortCode2",
              value: undefined
            },
            isUKBankAccount2: { key: "isUKBankAccount2", value: true }
          }
        }
      ],
      repetitions: 2,
      schema: {
        bankAccountBuildingSocietyReference: {},
        bankAccountCurrency: {},
        bankAccountIBAN: {},
        bankAccountName: {},
        bankAccountNumber: {},
        bankAccountProvider: {},
        bankAccountSortCode: {},
        isUKBankAccount: {}
      }
    });
  });

  it("should remove a acocunt", () => {
    const result = reducer(
      {
        bankAccounts: [
          {
            fields: {
              bankAccountBuildingSocietyReference1: {
                key: "bankAccountBuildingSocietyReference1",
                value: undefined
              },
              bankAccountCurrency1: {
                key: "bankAccountCurrency1",
                value: undefined
              },
              bankAccountIBAN1: { key: "bankAccountIBAN1", value: undefined },
              bankAccountName1: { key: "bankAccountName1", value: undefined },
              bankAccountNumber1: {
                key: "bankAccountNumber1",
                value: undefined
              },
              bankAccountProvider1: {
                key: "bankAccountProvider1",
                value: undefined
              },
              bankAccountSortCode1: {
                key: "bankAccountSortCode1",
                value: undefined
              },
              isUKBankAccount1: { key: "isUKBankAccount1", value: undefined }
            }
          },
          {
            displayFields: [
              "bankAccountProvider",
              "bankAccountName",
              "bankAccountSortCode",
              "bankAccountNumber",
              "bankAccountBuildingSocietyReference",
              "bankAccountIBAN"
            ],
            fields: {
              bankAccountBuildingSocietyReference2: {
                key: "bankAccountBuildingSocietyReference2",
                value: undefined
              },
              bankAccountCurrency2: { key: "bankAccountCurrency2", value: 1 },
              bankAccountIBAN2: { key: "bankAccountIBAN2", value: undefined },
              bankAccountName2: { key: "bankAccountName2", value: undefined },
              bankAccountNumber2: {
                key: "bankAccountNumber2",
                value: undefined
              },
              bankAccountProvider2: {
                key: "bankAccountProvider2",
                value: undefined
              },
              bankAccountSortCode2: {
                key: "bankAccountSortCode2",
                value: undefined
              },
              isUKBankAccount2: { key: "isUKBankAccount2", value: true }
            }
          }
        ],
        repetitions: 2,
        schema: {
          bankAccountBuildingSocietyReference: {},
          bankAccountCurrency: {},
          bankAccountIBAN: {},
          bankAccountName: {},
          bankAccountNumber: {},
          bankAccountProvider: {},
          bankAccountSortCode: {},
          isUKBankAccount: {}
        }
      },
      {
        type: REMOVE_BANK_ACCOUNT,
        payload: {
          currentValues: {
            bankAccountCurrency2: 45,
            bankAccountBuildingSocietyReference2: "bbbb"
          },
          index: 1
        }
      }
    );

    expect(result).toEqual({
      bankAccounts: [
        {
          displayFields: [
            "bankAccountProvider",
            "bankAccountName",
            "bankAccountSortCode",
            "bankAccountNumber",
            "bankAccountBuildingSocietyReference",
            "bankAccountIBAN"
          ],
          fields: {
            bankAccountBuildingSocietyReference1: {
              key: "bankAccountBuildingSocietyReference1",
              value: "bbbb"
            },
            bankAccountCurrency1: {
              key: "bankAccountCurrency1",
              value: 45
            },
            bankAccountIBAN1: { key: "bankAccountIBAN1", value: undefined },
            bankAccountName1: { key: "bankAccountName1", value: undefined },
            bankAccountNumber1: { key: "bankAccountNumber1", value: undefined },
            bankAccountProvider1: {
              key: "bankAccountProvider1",
              value: undefined
            },
            bankAccountSortCode1: {
              key: "bankAccountSortCode1",
              value: undefined
            },
            isUKBankAccount1: { key: "isUKBankAccount1", value: undefined }
          }
        }
      ],
      repetitions: 1,
      schema: {
        bankAccountBuildingSocietyReference: {},
        bankAccountCurrency: {},
        bankAccountIBAN: {},
        bankAccountName: {},
        bankAccountNumber: {},
        bankAccountProvider: {},
        bankAccountSortCode: {},
        isUKBankAccount: {}
      }
    });
  });
});
