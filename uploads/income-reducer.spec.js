import reducer from "./income-reducer";
import {
  FETCH_ACCOUNTS_SUCCESS,
  SAVE_ACCOUNTS_SUCCESS
} from "../../banks/bank-accounts-action-types";
import {
  FETCH_PORTFOLIO_INCOME_SUCCESS,
  TOGGLE_INCOME_REQUIREMENTS,
  TOGGLE_INCOME_SEPARATE,
  TOGGLE_REGULAR_PAYMENTS,
  REMOVE_ALL_PAYMENTS,
  HYDRATE_STATE_BEFORE_ACCOUNT
} from "./income-action-types";

const schema = {
  portfolioIncomeSeparate: {
    label: "Do you require income and capital to be kept separate?",
    type: "boolean",
    readonly: false,
    mandatory: true
  },
  portfolioOtherIncomeRequirements: {
    label: "Do you have any other income requirements?",
    type: "boolean",
    readonly: false,
    mandatory: true
  },
  regularPaymentAmount: {
    type: "currency",
    readonly: false,
    mandatory: true,
    label: "Amount"
  },
  regularPaymentStartDate: {
    type: "date",
    readonly: false,
    mandatory: true
  },
  portfolioManageIncomeBankAccountId: {
    label: "",
    type: "text",
    readonly: false,
    mandatory: true
  },
  regularPaymentBankAccountId: {
    label: "Bank account",
    type: "text",
    readonly: false,
    mandatory: true
  },
  portfolioIncomeRequired: {
    label: "Are you reliant on income or regular payments from the Portfolio?",
    type: "boolean",
    readonly: false,
    mandatory: true
  },
  portfolioOtherIncomeRequirementsDetail: {
    label: "Provide details of these requirements?",
    type: "text",
    readonly: false,
    mandatory: true
  },
  portfolioManageIncome: {
    label: "How would you like to manage the income?",
    type: "text",
    readonly: false,
    mandatory: true
  },
  regularPaymentSource: {
    type: "text",
    readonly: false,
    mandatory: true
  },
  regularPaymentFrequency: {
    type: "text",
    readonly: false,
    mandatory: true,
    label: "Frequency"
  },
  portfolioWithdrawals: {
    label: "Do you require a regular fixed payment by standing order?",
    type: "boolean",
    readonly: false,
    mandatory: true
  },
  portfolioRegularPayments: {
    type: "entityList/regularPaymentInstruction",
    readonly: false,
    mandatory: true,
    fields: [
      "regularPaymentBankAccountId",
      "regularPaymentAmount",
      "regularPaymentFrequency",
      "regularPaymentStartDate",
      "regularPaymentSource"
    ]
  }
};

describe("income reducer", () => {
  it("should convert the bank accounts to display format", () => {
    verify(
      [
        {
          bankAccountProvider: "HSBC",
          bankAccountName: "Raj Singh",
          bankAccountNumber: "324234",
          entityId: "111"
        },
        {
          bankAccountProvider: "Metro",
          bankAccountName: "Simon Rosner",
          bankAccountNumber: "234234",
          entityId: "222"
        }
      ],
      [
        { id: "111", value: "HSBC 324234, R Singh" },
        { id: "222", value: "Metro 234234, S Rosner" }
      ]
    );
    verify(
      [
        {
          bankAccountProvider: "HSBC",
          bankAccountName: "Raj",
          bankAccountNumber: "324234",
          entityId: "111"
        },
        {
          bankAccountProvider: "Metro",
          bankAccountName: "Simon Rosner Maxwell",
          bankAccountNumber: "234234",
          entityId: "222"
        }
      ],
      [
        { id: "111", value: "HSBC 324234, Raj" },
        { id: "222", value: "Metro 234234, S Rosner" }
      ]
    );

    verify(
      [
        {
          bankAccountProvider: "HSBC",
          bankAccountName: "Raj Singh",
          bankAccountNumber: "324234",
          entityId: "111"
        }
      ],
      [
        { id: "111", value: "HSBC 324234, R Singh" },
        { id: "add", value: "Add a nominated bank account" }
      ]
    );
    verify(
      [
        {
          bankAccountProvider: "",
          bankAccountName: "Raj Singh",
          bankAccountNumber: "324234",
          entityId: "111"
        }
      ],
      [
        { id: "111", value: "324234, R Singh" },
        { id: "add", value: "Add a nominated bank account" }
      ]
    );
    verify(
      [
        {
          bankAccountProvider: "HSBC",
          bankAccountName: "",
          bankAccountNumber: "",
          entityId: "111"
        }
      ],
      [
        { id: "111", value: "HSBC ," },
        { id: "add", value: "Add a nominated bank account" }
      ]
    );
    verify([], [{ id: "add", value: "Add a nominated bank account" }]);
    verify(
      [{ entityId: "00" }],
      [
        { id: "00", value: "" },
        { id: "add", value: "Add a nominated bank account" }
      ]
    );
  });

  it("should add the regualr payments as portfolioRegularPayments fields", () => {
    const result = reducer(
      {},
      {
        type: FETCH_PORTFOLIO_INCOME_SUCCESS,
        payload: {
          data: {
            portfolioRegularPayments: [
              {
                regularPaymentBankAccountId: "22",
                regularPaymentAmount: 2034,
                regularPaymentFrequency: "monthly",
                regularPaymentStartDate: "2018-06-30",
                regularPaymentSource: "1"
              },
              {
                regularPaymentBankAccountId: "232",
                regularPaymentAmount: 2134,
                regularPaymentFrequency: "quarterly",
                regularPaymentStartDate: "2018-07-30",
                regularPaymentSource: "2"
              }
            ]
          },
          schema: {
            regularPaymentSource: {
              type: "text",
              readonly: false,
              mandatory: true
            },
            regularPaymentFrequency: {
              type: "text",
              readonly: false,
              mandatory: true
            },
            regularPaymentAmount: {
              type: "currency",
              readonly: false,
              mandatory: true
            },
            regularPaymentStartDate: {
              type: "date",
              readonly: false,
              mandatory: true
            },
            regularPaymentBankAccountId: {
              label: "Bank account",
              type: "text",
              readonly: false,
              mandatory: true
            }
          }
        }
      }
    );

    expect(result.portfolioRegularPayments.length).toEqual(2);
    expect(
      result.portfolioRegularPayments[0].fields["regularPaymentBankAccountId1"]
        .value
    ).toEqual("22");
    expect(
      result.portfolioRegularPayments[1].fields["regularPaymentBankAccountId2"]
        .value
    ).toEqual("232");
  });

  it("should handle the toggle the income requirements to false and mark description as deleted", () => {
    const state = {
      schema: schema,
      fields: {
        a: { label: "aa", value: "a1" },
        b: { label: "bb", value: "b1" },
        c: { label: "cc", value: "c1" },

        portfolioOtherIncomeRequirements: {
          label: "Do you have any other income requirements?",
          type: "boolean",
          readonly: false,
          mandatory: true
        },
        portfolioOtherIncomeRequirementsDetail: {
          label: "Provide details of these requirements?",
          type: "text",
          readonly: false,
          mandatory: true
        },
        portfolioRegularPayments: {
          type: "entityList/regularPaymentInstruction",
          readonly: false,
          mandatory: true,
          fields: [
            "regularPaymentBankAccountId",
            "regularPaymentAmount",
            "regularPaymentFrequency",
            "regularPaymentStartDate",
            "regularPaymentSource"
          ]
        }
      },

      repetitions: 2,
      portfolioRegularPayments: [
        { fields: {}, entityId: "99" },
        { fields: {}, entityId: "98" }
      ]
    };

    const result = reducer(state, {
      type: TOGGLE_INCOME_REQUIREMENTS,
      payload: {
        currentValues: {
          a: "a11",
          b: "b11",
          c: "c11",
          portfolioOtherIncomeRequirementsDetail: "value",
          portfolioOtherIncomeRequirements: true,
          regularPaymentBankAccountId1: "123",
          regularPaymentAmount1: "222",
          regularPaymentFrequency1: 1,
          regularPaymentStartDate1: "23/03/2018",
          regularPaymentSource1: 2,
          regularPaymentBankAccountId2: "000",
          regularPaymentAmount2: "9090",
          regularPaymentFrequency2: 1
        },
        answer: false
      }
    });

    expect(result).toEqual({
      fields: {
        a: { label: "aa", value: "a11" },
        b: { label: "bb", value: "b11" },
        c: { label: "cc", value: "c11" },
        portfolioOtherIncomeRequirements: {
          label: "Do you have any other income requirements?",
          mandatory: true,
          readonly: false,
          type: "boolean",
          value: false
        },
        portfolioOtherIncomeRequirementsDetail: {
          delete: true,
          label: "Provide details of these requirements?",
          mandatory: true,
          readonly: false,
          type: "text",
          value: "value"
        },
        portfolioRegularPayments: {
          fields: [
            "regularPaymentBankAccountId",
            "regularPaymentAmount",
            "regularPaymentFrequency",
            "regularPaymentStartDate",
            "regularPaymentSource"
          ],
          mandatory: true,
          readonly: false,
          type: "entityList/regularPaymentInstruction",
          value: undefined
        }
      },
      portfolioRegularPayments: [
        {
          entityId: "99",
          fields: {
            regularPaymentAmount1: {
              key: "regularPaymentAmount1",
              label: "Amount",
              mandatory: true,
              readonly: false,
              type: "currency",
              value: "222"
            },
            regularPaymentBankAccountId1: {
              key: "regularPaymentBankAccountId1",
              label: "Bank account",
              mandatory: true,
              readonly: false,
              type: "text",
              value: "123"
            },
            regularPaymentFrequency1: {
              key: "regularPaymentFrequency1",
              label: "Frequency",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 1
            },
            regularPaymentSource1: {
              key: "regularPaymentSource1",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 2
            },
            regularPaymentStartDate1: {
              key: "regularPaymentStartDate1",
              mandatory: true,
              readonly: false,
              type: "date",
              value: "23/03/2018"
            }
          }
        },
        {
          entityId: "98",
          fields: {
            regularPaymentAmount2: {
              key: "regularPaymentAmount2",
              label: "Amount",
              mandatory: true,
              readonly: false,
              type: "currency",
              value: "9090"
            },
            regularPaymentBankAccountId2: {
              key: "regularPaymentBankAccountId2",
              label: "Bank account",
              mandatory: true,
              readonly: false,
              type: "text",
              value: "000"
            },
            regularPaymentFrequency2: {
              key: "regularPaymentFrequency2",
              label: "Frequency",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 1
            },
            regularPaymentSource2: {
              key: "regularPaymentSource2",
              mandatory: true,
              readonly: false,
              type: "text",
              value: undefined
            },
            regularPaymentStartDate2: {
              key: "regularPaymentStartDate2",
              mandatory: true,
              readonly: false,
              type: "date",
              value: undefined
            }
          }
        }
      ],
      repetitions: 2,
      schema: schema
    });
  });

  it("should handle the toggle the income requirements to true and mark description as un-deleted", () => {
    const state = {
      fields: {
        a: { label: "aa", value: "a1" },
        b: { label: "bb", value: "b1" },
        c: { label: "cc", value: "c1" },
        portfolioOtherIncomeRequirements: {
          label: "Do you have any other income requirements?",
          type: "boolean",
          readonly: false,
          mandatory: true
        },
        portfolioOtherIncomeRequirementsDetail: {
          label: "Provide details of these requirements?",
          type: "text",
          readonly: false,
          mandatory: true,
          value: "existing"
        }
      }
    };

    const result = reducer(state, {
      type: TOGGLE_INCOME_REQUIREMENTS,
      payload: {
        currentValues: {
          a: "a11",
          b: "b11",
          c: "c11",
          portfolioOtherIncomeRequirementsDetail: "value",
          portfolioOtherIncomeRequirements: false
        },
        answer: true
      }
    });

    expect(result).toEqual({
      fields: {
        a: { label: "aa", value: "a11" },
        b: { label: "bb", value: "b11" },
        c: { label: "cc", value: "c11" },
        portfolioOtherIncomeRequirements: {
          label: "Do you have any other income requirements?",
          type: "boolean",
          readonly: false,
          mandatory: true,
          value: true
        },
        portfolioOtherIncomeRequirementsDetail: {
          label: "Provide details of these requirements?",
          type: "text",
          readonly: false,
          mandatory: true,
          value: "existing",
          delete: undefined
        }
      }
    });
  });

  it("should toggle the manage income on selecting income separate from true to false", () => {
    const state = {
      fields: {
        a: { label: "aa", value: "a1" },
        b: { label: "bb", value: "b1" },
        c: { label: "cc", value: "c1" },
        portfolioIncomeSeparate: {
          label: "Do you require income and capital to be kept separate?",
          type: "boolean",
          readonly: false,
          mandatory: true,
          value: true
        },
        portfolioManageIncome: {
          label: "How would you like to manage the income?",
          type: "text",
          readonly: false,
          mandatory: true,
          value: 3
        },
        portfolioManageIncomeBankAccountId: {
          label: "",
          type: "text",
          readonly: false,
          mandatory: true,
          value: "234232"
        }
      }
    };

    const result = reducer(state, {
      type: TOGGLE_INCOME_SEPARATE,
      payload: {
        currentValues: {
          a: "a11",
          b: "b11",
          c: "c11",
          portfolioIncomeSeparate: true,
          portfolioManageIncome: 2,
          portfolioManageIncomeBankAccountId: "4455"
        },
        answer: false
      }
    });

    expect(result).toEqual({
      fields: {
        a: { label: "aa", value: "a11" },
        b: { label: "bb", value: "b11" },
        c: { label: "cc", value: "c11" },
        portfolioIncomeSeparate: {
          label: "Do you require income and capital to be kept separate?",
          type: "boolean",
          readonly: false,
          mandatory: true,
          value: false
        },
        portfolioManageIncome: {
          label: "How would you like to manage the income?",
          type: "text",
          readonly: false,
          mandatory: true,
          value: 2,
          delete: true
        },
        portfolioManageIncomeBankAccountId: {
          label: "",
          type: "text",
          readonly: false,
          mandatory: true,
          value: "4455",
          delete: true
        }
      }
    });
  });

  it("should toggle the manage income on selecting income separate from false to true", () => {
    const state = {
      fields: {
        a: { label: "aa", value: "a1" },
        b: { label: "bb", value: "b1" },
        c: { label: "cc", value: "c1" },
        portfolioIncomeSeparate: {
          label: "Do you require income and capital to be kept separate?",
          type: "boolean",
          readonly: false,
          mandatory: true,
          value: true
        },
        portfolioManageIncome: {
          label: "How would you like to manage the income?",
          type: "text",
          readonly: false,
          mandatory: true,
          value: 3
        },
        portfolioManageIncomeBankAccountId: {
          label: "",
          type: "text",
          readonly: false,
          mandatory: true,
          value: "234232"
        }
      }
    };

    const result = reducer(state, {
      type: TOGGLE_INCOME_SEPARATE,
      payload: {
        currentValues: {
          a: "a11",
          b: "b11",
          c: "c11",
          portfolioIncomeSeparate: true
        },
        answer: true
      }
    });

    expect(result).toEqual({
      fields: {
        a: { label: "aa", value: "a11" },
        b: { label: "bb", value: "b11" },
        c: { label: "cc", value: "c11" },
        portfolioIncomeSeparate: {
          label: "Do you require income and capital to be kept separate?",
          type: "boolean",
          readonly: false,
          mandatory: true,
          value: true
        },
        portfolioManageIncome: {
          label: "How would you like to manage the income?",
          type: "text",
          readonly: false,
          mandatory: true,
          value: 3,
          delete: undefined
        },
        portfolioManageIncomeBankAccountId: {
          label: "",
          type: "text",
          readonly: false,
          mandatory: true,
          value: "234232",
          delete: undefined
        }
      }
    });
  });

  it("should toggle the regulat payments to yes and only call add payment is there are no deleted items", () => {
    const state = {
      fields: {
        a: {},
        b: {},
        portfolioWithdrawals: {},
        portfolioRegularPayments: { fields: ["l1", "l2"] }
      },
      schema: {
        a: {},
        b: {},
        portfolioWithdrawals: {},
        l1: {},
        l2: {}
      },
      portfolioRegularPayments: [
        { fields: { l11: { value: 34 }, l21: { value: "ss" } }, delete: true }
      ],
      nonListFields: ["a", "b", "portfolioWithdrawals"]
    };

    const result = reducer(state, {
      type: TOGGLE_REGULAR_PAYMENTS,
      payload: {
        answer: true,
        currentValues: { a: "234", b: "abcd" },
        listName: "portfolioRegularPayments"
      }
    });

    expect(result).toEqual({
      schema: {
        a: {},
        b: {},
        portfolioWithdrawals: {},
        l1: {},
        l2: {}
      },
      fields: {
        a: { value: "234" },
        b: { value: "abcd" },
        portfolioWithdrawals: { value: true },
        portfolioRegularPayments: { fields: ["l1", "l2"], value: undefined }
      },
      portfolioRegularPayments: [
        {
          fields: {
            l11: { value: 34, key: "l11" },
            l21: { value: "ss", key: "l21" }
          },
          entityId: undefined
        }
      ],
      nonListFields: ["a", "b", "portfolioWithdrawals"]
    });
  });

  it("should update the account id after acocunt save", () => {
    const state = {
      fields: {
        a: {},
        b: {}
      }
    };

    expect(
      reducer(state, {
        type: SAVE_ACCOUNTS_SUCCESS,
        payload: { entityIds: ["12"] }
      })
    ).toEqual({
      fields: {
        a: {},
        b: {}
      },
      bankAccountId: "12"
    });
  });

  it("should hydrate the state for inner item on accounts fetch success", () => {
    const state = {
      fields: {
        a: {},
        b: {},
        portfolioRegularPayments: {
          type: "entityList/regularPaymentInstruction",
          readonly: false,
          mandatory: true,
          fields: [
            "regularPaymentBankAccountId",
            "regularPaymentAmount",
            "regularPaymentFrequency",
            "regularPaymentStartDate",
            "regularPaymentSource"
          ]
        }
      },
      schema: schema,
      portfolioRegularPayments: [
        {
          entityId: "99",
          fields: {
            regularPaymentAmount1: {
              key: "regularPaymentAmount1",
              label: "Amount",
              mandatory: true,
              readonly: false,
              type: "currency",
              value: "222"
            },
            regularPaymentBankAccountId1: {
              key: "regularPaymentBankAccountId1",
              label: "Bank account",
              mandatory: true,
              readonly: false,
              type: "text",
              value: "123"
            },
            regularPaymentFrequency1: {
              key: "regularPaymentFrequency1",
              label: "Frequency",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 1
            },
            regularPaymentSource1: {
              key: "regularPaymentSource1",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 2
            },
            regularPaymentStartDate1: {
              key: "regularPaymentStartDate1",
              mandatory: true,
              readonly: false,
              type: "date",
              value: "23/03/2018"
            }
          }
        },
        {
          fields: {
            regularPaymentAmount2: {
              key: "regularPaymentAmount2",
              label: "Amount",
              mandatory: true,
              readonly: false,
              type: "currency",
              value: "9090"
            },
            regularPaymentBankAccountId2: {
              key: "regularPaymentBankAccountId2",
              label: "Bank account",
              mandatory: true,
              readonly: false,
              type: "text",
              value: ""
            },
            regularPaymentFrequency2: {
              key: "regularPaymentFrequency2",
              label: "Frequency",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 1
            },
            regularPaymentSource2: {
              key: "regularPaymentSource2",
              mandatory: true,
              readonly: false,
              type: "text",
              value: undefined
            },
            regularPaymentStartDate2: {
              key: "regularPaymentStartDate2",
              mandatory: true,
              readonly: false,
              type: "date",
              value: undefined
            }
          }
        }
      ],
      bankAccountField: "regularPaymentBankAccountId2",
      bankAccountId: "343",
      isListField: true
    };

    const result = reducer(state, {
      type: FETCH_ACCOUNTS_SUCCESS,
      payload: { accounts: { data: { bankAccounts: [{}, {}] } } }
    });

    expect(result).toEqual({
      bankAccountField: "",
      bankAccountId: "",
      bankAccounts: [
        { id: undefined, value: "" },
        { id: undefined, value: "" }
      ],
      fields: {
        a: { value: undefined },
        b: { value: undefined },
        portfolioRegularPayments: {
          type: "entityList/regularPaymentInstruction",
          readonly: false,
          mandatory: true,
          fields: [
            "regularPaymentBankAccountId",
            "regularPaymentAmount",
            "regularPaymentFrequency",
            "regularPaymentStartDate",
            "regularPaymentSource"
          ]
        },
        regularPaymentBankAccountId2: { value: "343" }
      },
      isListField: undefined,
      portfolioRegularPayments: [
        {
          entityId: "99",
          fields: {
            regularPaymentAmount1: {
              key: "regularPaymentAmount1",
              label: "Amount",
              mandatory: true,
              readonly: false,
              type: "currency",
              value: "222"
            },
            regularPaymentBankAccountId1: {
              key: "regularPaymentBankAccountId1",
              label: "Bank account",
              mandatory: true,
              readonly: false,
              type: "text",
              value: "123"
            },
            regularPaymentFrequency1: {
              key: "regularPaymentFrequency1",
              label: "Frequency",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 1
            },
            regularPaymentSource1: {
              key: "regularPaymentSource1",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 2
            },
            regularPaymentStartDate1: {
              key: "regularPaymentStartDate1",
              mandatory: true,
              readonly: false,
              type: "date",
              value: "23/03/2018"
            }
          }
        },
        {
          entityId: undefined,
          fields: {
            regularPaymentAmount2: {
              key: "regularPaymentAmount2",
              label: "Amount",
              mandatory: true,
              readonly: false,
              type: "currency",
              value: "9090"
            },
            regularPaymentBankAccountId2: {
              key: "regularPaymentBankAccountId2",
              label: "Bank account",
              mandatory: true,
              readonly: false,
              type: "text",
              value: "343"
            },
            regularPaymentFrequency2: {
              key: "regularPaymentFrequency2",
              label: "Frequency",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 1
            },
            regularPaymentSource2: {
              key: "regularPaymentSource2",
              mandatory: true,
              readonly: false,
              type: "text",
              value: undefined
            },
            regularPaymentStartDate2: {
              key: "regularPaymentStartDate2",
              mandatory: true,
              readonly: false,
              type: "date",
              value: undefined
            }
          }
        }
      ],
      schema: schema
    });
  });

  it("should remove all payments and keep the values", () => {
    const state = {
      fields: {
        a: {},
        portfolioWithdrawals: {},
        portfolioRegularPayments: {
          type: "entityList/regularPaymentInstruction",
          readonly: false,
          mandatory: true,
          fields: [
            "regularPaymentBankAccountId",
            "regularPaymentAmount",
            "regularPaymentFrequency",
            "regularPaymentStartDate",
            "regularPaymentSource"
          ]
        }
      },
      schema: schema,
      portfolioRegularPayments: [
        {
          entityId: "99",
          fields: {
            regularPaymentAmount1: {
              key: "regularPaymentAmount1",
              label: "Amount",
              mandatory: true,
              readonly: false,
              type: "currency",
              value: "222"
            },
            regularPaymentBankAccountId1: {
              key: "regularPaymentBankAccountId1",
              label: "Bank account",
              mandatory: true,
              readonly: false,
              type: "text",
              value: "123"
            },
            regularPaymentFrequency1: {
              key: "regularPaymentFrequency1",
              label: "Frequency",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 1
            },
            regularPaymentSource1: {
              key: "regularPaymentSource1",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 2
            },
            regularPaymentStartDate1: {
              key: "regularPaymentStartDate1",
              mandatory: true,
              readonly: false,
              type: "date",
              value: "23/03/2018"
            }
          }
        },
        {
          fields: {
            regularPaymentAmount2: {
              key: "regularPaymentAmount2",
              label: "Amount",
              mandatory: true,
              readonly: false,
              type: "currency",
              value: "9090"
            },
            regularPaymentBankAccountId2: {
              key: "regularPaymentBankAccountId2",
              label: "Bank account",
              mandatory: true,
              readonly: false,
              type: "text",
              value: ""
            },
            regularPaymentFrequency2: {
              key: "regularPaymentFrequency2",
              label: "Frequency",
              mandatory: true,
              readonly: false,
              type: "text",
              value: 1
            },
            regularPaymentSource2: {
              key: "regularPaymentSource2",
              mandatory: true,
              readonly: false,
              type: "text",
              value: undefined
            },
            regularPaymentStartDate2: {
              key: "regularPaymentStartDate2",
              mandatory: true,
              readonly: false,
              type: "date",
              value: undefined
            }
          }
        }
      ]
    };

    const result = reducer(state, {
      type: REMOVE_ALL_PAYMENTS,
      payload: {
        currentValues: {
          regularPaymentAmount2: 5989
        }
      }
    });

    expect(result).toEqual({
      fields: {
        a: {},
        portfolioRegularPayments: {
          fields: [
            "regularPaymentBankAccountId",
            "regularPaymentAmount",
            "regularPaymentFrequency",
            "regularPaymentStartDate",
            "regularPaymentSource"
          ],
          mandatory: true,
          readonly: false,
          type: "entityList/regularPaymentInstruction"
        },
        portfolioWithdrawals: { value: false }
      },
      portfolioRegularPayments: [
        {
          delete: true,
          entityId: "99",
          fields: {
            regularPaymentAmount1: {
              key: "regularPaymentAmount1",
              label: "Amount",
              mandatory: true,
              readonly: false,
              type: "currency",
              value: undefined
            },
            regularPaymentBankAccountId1: {
              key: "regularPaymentBankAccountId1",
              label: "Bank account",
              mandatory: true,
              readonly: false,
              type: "text",
              value: undefined
            },
            regularPaymentFrequency1: {
              key: "regularPaymentFrequency1",
              label: "Frequency",
              mandatory: true,
              readonly: false,
              type: "text",
              value: undefined
            },
            regularPaymentSource1: {
              key: "regularPaymentSource1",
              mandatory: true,
              readonly: false,
              type: "text",
              value: undefined
            },
            regularPaymentStartDate1: {
              key: "regularPaymentStartDate1",
              mandatory: true,
              readonly: false,
              type: "date",
              value: undefined
            }
          }
        },
        {
          delete: true,
          entityId: undefined,
          fields: {
            regularPaymentAmount2: {
              key: "regularPaymentAmount2",
              label: "Amount",
              mandatory: true,
              readonly: false,
              type: "currency",
              value: 5989
            },
            regularPaymentBankAccountId2: {
              key: "regularPaymentBankAccountId2",
              label: "Bank account",
              mandatory: true,
              readonly: false,
              type: "text",
              value: undefined
            },
            regularPaymentFrequency2: {
              key: "regularPaymentFrequency2",
              label: "Frequency",
              mandatory: true,
              readonly: false,
              type: "text",
              value: undefined
            },
            regularPaymentSource2: {
              key: "regularPaymentSource2",
              mandatory: true,
              readonly: false,
              type: "text",
              value: undefined
            },
            regularPaymentStartDate2: {
              key: "regularPaymentStartDate2",
              mandatory: true,
              readonly: false,
              type: "date",
              value: undefined
            }
          }
        }
      ],
      repetitions: 0,
      schema: {
        portfolioIncomeRequired: {
          label:
            "Are you reliant on income or regular payments from the Portfolio?",
          mandatory: true,
          readonly: false,
          type: "boolean"
        },
        portfolioIncomeSeparate: {
          label: "Do you require income and capital to be kept separate?",
          mandatory: true,
          readonly: false,
          type: "boolean"
        },
        portfolioManageIncome: {
          label: "How would you like to manage the income?",
          mandatory: true,
          readonly: false,
          type: "text"
        },
        portfolioManageIncomeBankAccountId: {
          label: "",
          mandatory: true,
          readonly: false,
          type: "text"
        },
        portfolioOtherIncomeRequirements: {
          label: "Do you have any other income requirements?",
          mandatory: true,
          readonly: false,
          type: "boolean"
        },
        portfolioOtherIncomeRequirementsDetail: {
          label: "Provide details of these requirements?",
          mandatory: true,
          readonly: false,
          type: "text"
        },
        portfolioRegularPayments: {
          fields: [
            "regularPaymentBankAccountId",
            "regularPaymentAmount",
            "regularPaymentFrequency",
            "regularPaymentStartDate",
            "regularPaymentSource"
          ],
          mandatory: true,
          readonly: false,
          type: "entityList/regularPaymentInstruction"
        },
        portfolioWithdrawals: {
          label: "Do you require a regular fixed payment by standing order?",
          mandatory: true,
          readonly: false,
          type: "boolean"
        },
        regularPaymentAmount: {
          label: "Amount",
          mandatory: true,
          readonly: false,
          type: "currency"
        },
        regularPaymentBankAccountId: {
          label: "Bank account",
          mandatory: true,
          readonly: false,
          type: "text"
        },
        regularPaymentFrequency: {
          label: "Frequency",
          mandatory: true,
          readonly: false,
          type: "text"
        },
        regularPaymentSource: {
          mandatory: true,
          readonly: false,
          type: "text"
        },
        regularPaymentStartDate: {
          mandatory: true,
          readonly: false,
          type: "date"
        }
      }
    });
  });

  it("should hydrate the state before modal opening", () => {
    const state = {
      schema: { a: {}, b: {} },
      fields: { a: {}, b: {} }
    };

    const result = reducer(state, {
      type: HYDRATE_STATE_BEFORE_ACCOUNT,
      payload: {
        currentValues: { a: "123", b: "abcjh" },
        fieldName: "abcc"
      }
    });

    expect(result).toEqual({
      bankAccountField: "abcc",
      fields: {
        a: { value: "123" },
        b: { value: "abcjh" },
      },
      hydrate: true,
      schema: { a: {}, b: {} }
    });
  });
});

function verify(input, expected) {
  const act = {
    type: FETCH_ACCOUNTS_SUCCESS,
    payload: {
      accounts: {
        data: {
          bankAccounts: input
        }
      }
    }
  };

  const result = reducer({}, act);
  expect(result.bankAccounts).toEqual(expected);
}
