import reducer from "./addresses-reducer";
import types from "../address/actions/addresses-action-types";
describe("addresses Reducer", () => {
  let schema;
  beforeEach(() => {
    schema = {
      addressLine1: {
        label: "Address line 1",
        type: "text",
        readonly: false,
        mandatory: true,
        validation: "Please enter the first line of your address."
      },
      addressLine2: {
        label: "Address line 2",
        type: "text",
        readonly: false,
        mandatory: false
      },
      addressLine3: {
        label: "Address line 3",
        type: "text",
        readonly: false,
        mandatory: false
      },
      addressCity: {
        label: "Town / City",
        type: "text",
        readonly: false,
        mandatory: true,
        validation: "Please enter your town or city."
      },
      addressCounty: {
        label: "County / State / Region ",
        type: "text",
        readonly: false,
        mandatory: false
      },
      addressPostCode: {
        label: "Postcode / Zip code",
        type: "text",
        readonly: false,
        mandatory: true,
        validation: "Please enter your postcode or zip code."
      },
      addressCountry: {
        label: "Country",
        type: "listItem/countries",
        readonly: false,
        mandatory: true,
        validation: "Please enter your country."
      }
    };
  });

  it("should return the initial state on default action", () => {
    const result = reducer();
    expect(result).toEqual({
      fieldNames: [],
      dataLoaded: false,
      saved: false,
      fields: {},
      addresses: [],
      extraAddressAnswered: false
    });
  });

  it("should map the fetched data when there is data", () => {
    const state = {
      repetitions: 2
    };

    const result = reducer(state, {
      type: types.FETCH_ADDRESS_SUCCESS,
      payload: {
        complete: true,
        schema: schema,
        data: {
          addresses: [
            {
              addressLine1: "Address line 1",
              addressLine2: "line 2",
              addressLine3: "line 3",
              addressCity: "Ganymede",
              addressCounty: "Ceres",
              addressPostCode: "MCRN",
              addressCountry: 78,
              entityId: "1"
            },
            {
              addressLine1: "Address line 1",
              addressLine2: "line 2",
              addressLine3: "line 3",
              addressCity: "Eros",
              addressCounty: "Belt",
              addressPostCode: "UNN",
              addressCountry: 43,
              entityId: "2"
            }
          ]
        }
      }
    });

    expect(result).toEqual({
      schema: schema,
      fieldNames: [
        "addressLine1",
        "addressLine2",
        "addressLine3",
        "addressCity",
        "addressCounty",
        "addressPostCode",
        "addressCountry"
      ],
      addresses: [
        {
          fields: {
            addressLine11: {
              key: "addressLine11",
              label: "Address line 1",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter the first line of your address.",
              value: "Address line 1"
            },
            addressLine21: {
              key: "addressLine21",
              label: "Address line 2",
              type: "text",
              readonly: false,
              mandatory: false,
              value: "line 2"
            },
            addressLine31: {
              key: "addressLine31",
              label: "Address line 3",
              type: "text",
              readonly: false,
              mandatory: false,
              value: "line 3"
            },
            addressCity1: {
              key: "addressCity1",
              label: "Town / City",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter your town or city.",
              value: "Ganymede"
            },
            addressCounty1: {
              key: "addressCounty1",
              label: "County / State / Region ",
              type: "text",
              readonly: false,
              mandatory: false,
              value: "Ceres"
            },
            addressPostCode1: {
              key: "addressPostCode1",
              label: "Postcode / Zip code",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter your postcode or zip code.",
              value: "MCRN"
            },
            addressCountry1: {
              key: "addressCountry1",
              label: "Country",
              type: "listItem/countries",
              readonly: false,
              mandatory: true,
              validation: "Please enter your country.",
              value: 78
            }
          },
          entityId: "1"
        },
        {
          fields: {
            addressLine12: {
              key: "addressLine12",
              label: "Address line 1",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter the first line of your address.",
              value: "Address line 1"
            },
            addressLine22: {
              key: "addressLine22",
              label: "Address line 2",
              type: "text",
              readonly: false,
              mandatory: false,
              value: "line 2"
            },
            addressLine32: {
              key: "addressLine32",
              label: "Address line 3",
              type: "text",
              readonly: false,
              mandatory: false,
              value: "line 3"
            },
            addressCity2: {
              key: "addressCity2",
              label: "Town / City",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter your town or city.",
              value: "Eros"
            },
            addressCounty2: {
              key: "addressCounty2",
              label: "County / State / Region ",
              type: "text",
              readonly: false,
              mandatory: false,
              value: "Belt"
            },
            addressPostCode2: {
              key: "addressPostCode2",
              label: "Postcode / Zip code",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter your postcode or zip code.",
              value: "UNN"
            },
            addressCountry2: {
              key: "addressCountry2",
              label: "Country",
              type: "listItem/countries",
              readonly: false,
              mandatory: true,
              validation: "Please enter your country.",
              value: 43
            }
          },
          entityId: "2"
        }
      ],
      dataLoaded: true,
      repetitions: 2,
      saved: true
    });

    // expect(result.addresses).toEqual([{}, {}]);
  });

  it("should create an empty structure when there is no data", () => {
    const state = {
      repetitions: 2
    };
    const result = reducer(state, {
      type: types.FETCH_ADDRESS_SUCCESS,
      payload: {
        complete: true,
        schema: schema,
        data: {}
      }
    });

    expect(result).toEqual({
      schema: schema,
      fieldNames: [
        "addressLine1",
        "addressLine2",
        "addressLine3",
        "addressCity",
        "addressCounty",
        "addressPostCode",
        "addressCountry"
      ],
      addresses: [
        {
          fields: {
            addressLine11: {
              key: "addressLine11",
              label: "Address line 1",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter the first line of your address.",
              value: undefined
            },
            addressLine21: {
              key: "addressLine21",
              label: "Address line 2",
              type: "text",
              readonly: false,
              mandatory: false,
              value: undefined
            },
            addressLine31: {
              key: "addressLine31",
              label: "Address line 3",
              type: "text",
              readonly: false,
              mandatory: false,
              value: undefined
            },
            addressCity1: {
              key: "addressCity1",
              label: "Town / City",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter your town or city.",
              value: undefined
            },
            addressCounty1: {
              key: "addressCounty1",
              label: "County / State / Region ",
              type: "text",
              readonly: false,
              mandatory: false,
              value: undefined
            },
            addressPostCode1: {
              key: "addressPostCode1",
              label: "Postcode / Zip code",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter your postcode or zip code.",
              value: undefined
            },
            addressCountry1: {
              key: "addressCountry1",
              label: "Country",
              type: "listItem/countries",
              readonly: false,
              mandatory: true,
              validation: "Please enter your country.",
              value: undefined
            }
          }
        }
      ],
      dataLoaded: true,
      repetitions: 1,
      saved: true
    });
  });

  it("should create the second address", () => {
    const state = {
      schema: schema,
      addresses: [
        {
          fields: {
            addressLine11: {
              key: "addressLine11",
              label: "Address line 1",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter the first line of your address.",
              value: "Add line 1"
            },
            addressLine21: {
              key: "addressLine21",
              label: "Address line 2",
              type: "text",
              readonly: false,
              mandatory: false,
              value: undefined
            },
            addressLine31: {
              key: "addressLine31",
              label: "Address line 3",
              type: "text",
              readonly: false,
              mandatory: false,
              value: undefined
            },
            addressCity1: {
              key: "addressCity1",
              label: "Town / City",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter your town or city.",
              value: undefined
            },
            addressCounty1: {
              key: "addressCounty1",
              label: "County / State / Region ",
              type: "text",
              readonly: false,
              mandatory: false,
              value: undefined
            },
            addressPostCode1: {
              key: "addressPostCode1",
              label: "Postcode / Zip code",
              type: "text",
              readonly: false,
              mandatory: true,
              validation: "Please enter your postcode or zip code.",
              value: undefined
            },
            addressCountry1: {
              key: "addressCountry1",
              label: "Country",
              type: "listItem/countries",
              readonly: false,
              mandatory: true,
              validation: "Please enter your country.",
              value: undefined
            }
          }
        }
      ],
      repetitions: 1
    };
    const result = reducer(state, {
      type: types.EXTRA_ADDRESS,
      payload: { currentValues: { addressLine11: "Add line 1" } }
    });

    expect(result.addresses).toEqual([
      {
        fields: {
          addressLine11: {
            key: "addressLine11",
            label: "Address line 1",
            type: "text",
            readonly: false,
            mandatory: true,
            validation: "Please enter the first line of your address.",
            value: "Add line 1"
          },
          addressLine21: {
            key: "addressLine21",
            label: "Address line 2",
            type: "text",
            readonly: false,
            mandatory: false,
            value: undefined
          },
          addressLine31: {
            key: "addressLine31",
            label: "Address line 3",
            type: "text",
            readonly: false,
            mandatory: false,
            value: undefined
          },
          addressCity1: {
            key: "addressCity1",
            label: "Town / City",
            type: "text",
            readonly: false,
            mandatory: true,
            validation: "Please enter your town or city.",
            value: undefined
          },
          addressCounty1: {
            key: "addressCounty1",
            label: "County / State / Region ",
            type: "text",
            readonly: false,
            mandatory: false,
            value: undefined
          },
          addressPostCode1: {
            key: "addressPostCode1",
            label: "Postcode / Zip code",
            type: "text",
            readonly: false,
            mandatory: true,
            validation: "Please enter your postcode or zip code.",
            value: undefined
          },
          addressCountry1: {
            key: "addressCountry1",
            label: "Country",
            type: "listItem/countries",
            readonly: false,
            mandatory: true,
            validation: "Please enter your country.",
            value: undefined
          }
        }
      },
      {
        fields: {
          addressLine12: {
            key: "addressLine12",
            label: "Address line 1",
            type: "text",
            readonly: false,
            mandatory: true,
            validation: "Please enter the first line of your address.",
            value: undefined
          },
          addressLine22: {
            key: "addressLine22",
            label: "Address line 2",
            type: "text",
            readonly: false,
            mandatory: false,
            value: undefined
          },
          addressLine32: {
            key: "addressLine32",
            label: "Address line 3",
            type: "text",
            readonly: false,
            mandatory: false,
            value: undefined
          },
          addressCity2: {
            key: "addressCity2",
            label: "Town / City",
            type: "text",
            readonly: false,
            mandatory: true,
            validation: "Please enter your town or city.",
            value: undefined
          },
          addressCounty2: {
            key: "addressCounty2",
            label: "County / State / Region ",
            type: "text",
            readonly: false,
            mandatory: false,
            value: undefined
          },
          addressPostCode2: {
            key: "addressPostCode2",
            label: "Postcode / Zip code",
            type: "text",
            readonly: false,
            mandatory: true,
            validation: "Please enter your postcode or zip code.",
            value: undefined
          },
          addressCountry2: {
            key: "addressCountry2",
            label: "Country",
            type: "listItem/countries",
            readonly: false,
            mandatory: true,
            validation: "Please enter your country.",
            value: undefined
          }
        }
      }
    ]);
  });

  it("should remove the extra address if it`s just local", () => {
    const state = {
      schema: {
        a: { label: "a" },
        b: { label: "b" }
      },
      addresses: [
        {
          fields: {
            a1: { label: "a", value: "a1" },
            b1: { label: "b", value: "a1" }
          }
        },
        {
          fields: {
            a2: { label: "a", value: undefined },
            b2: { label: "a", value: undefined }
          }
        }
      ],
      repetitions: 2
    };

    const result = reducer(state, {
      type: types.EXTRA_ADDRESS_REMOVED,
      payload: { index: 2, currentValues: {} }
    });

    expect(result).toEqual({
      schema: {
        a: { label: "a" },
        b: { label: "b" }
      },
      repetitions: 1,
      addresses: [
        {
          fields: {
            a1: { label: "a", value: "a1" },
            b1: { label: "b", value: "a1" }
          }
        }
      ]
    });
  });

  it("should remove the extra address and mark as deleted if entityid is present", () => {
    const state = {
      schema: { a: { label: "a" }, b: { label: "b" } },
      addresses: [
        {
          fields: {
            a1: { label: "a", value: "a1" },
            b1: { label: "b", value: "a1" }
          },
          entityId: "11"
        },
        {
          fields: {
            a2: { label: "a", value: undefined },
            b2: { label: "a", value: undefined }
          },
          entityId: "12"
        }
      ],
      repetitions: 2
    };

    const result = reducer(state, {
      type: types.EXTRA_ADDRESS_REMOVED,
      payload: { index: 2, currentValues: {} }
    });

    expect(result).toEqual({
      schema: {
        a: { label: "a" },
        b: { label: "b" }
      },
      repetitions: 1,
      addresses: [
        {
          fields: {
            a1: { label: "a", value: "a1" },
            b1: { label: "b", value: "a1" }
          },
          entityId: "11"
        },
        {
          fields: {
            a2: { label: "a", value: undefined },
            b2: { label: "a", value: undefined }
          },
          entityId: "12",
          delete: true
        }
      ]
    });
  });

  it("should update the state after new save", () => {
    const state = {
      addresses: [],
      schema: {
        a: { label: "lbl a", type: "xxx" },
        b: { label: "lbl b", type: "xxx" },
        c: { label: "lbl c", type: "xxx" }
      }
    };

    const result = reducer(state, {
      type: types.SAVE_ADDRESS_SUCCESS,
      payload: {
        request: { addresses: [{ a: "a1", b: "b1", c: "c1" }] },
        entityIds: ["e11"]
      }
    });

    expect(result).toEqual({
      schema: {
        a: { label: "lbl a", type: "xxx" },
        b: { label: "lbl b", type: "xxx" },
        c: { label: "lbl c", type: "xxx" }
      },
      addresses: [
        {
          fields: {
            a1: { label: "lbl a", type: "xxx", value: "a1", key: "a1" },
            b1: { label: "lbl b", type: "xxx", value: "b1", key: "b1" },
            c1: { label: "lbl c", type: "xxx", value: "c1", key: "c1" }
          },
          entityId: "e11"
        }
      ]
    });
  });

  it("should update the state after existing item save", () => {
    const state = {
      addresses: [
        {
          fields: {
            a1: "a1",
            b1: "b1",
            c1: "c1",
            entityId: "e11"
          }
        }
      ],
      schema: { a: {}, b: {}, c: {} }
    };

    const result = reducer(state, {
      type: types.SAVE_ADDRESS_SUCCESS,
      payload: {
        request: {
          addresses: [{ a: "a1-e", b: "b1-e", c: null, entityId: "e11" }]
        },
        entityIds: ["e11"]
      }
    });

    expect(result).toEqual({
      schema: { a: {}, b: {}, c: {} },
      addresses: [
        {
          fields: {
            a1: { key: "a1", value: "a1-e" },
            b1: { key: "b1", value: "b1-e" },
            c1: { key: "c1", value: null }
          },
          entityId: "e11"
        }
      ]
    });
  });

  it("should remove the addresses marked as deleted", () => {
    const state = {
      addresses: [
        { fields: { a1: "a1", b1: "b1", c1: "c1", entityId: "e11" } },
        {
          fields: { a2: "a2", b2: "b2", c2: "c3", entityId: "e12" },
          delete: true
        },
        { fields: { a3: "a3", b3: "b3", c3: "c3", entityId: "e13" } }
      ],
      schema: { a: {}, b: {}, c: {} }
    };

    const result = reducer(state, {
      type: types.SAVE_ADDRESS_SUCCESS,
      payload: {
        request: {
          addresses: [
            { a: "a1-e", b: "b1-e", c: null, entityId: "e11" },
            { entityId: "e12", delete: true },
            { a: "a-3", b: "b-3", c: "c-3", entityId: "e13" }
          ]
        },
        entityIds: ["e11", "e12", "e13"]
      }
    });

    expect(result).toEqual({
      schema: { a: {}, b: {}, c: {} },
      addresses: [
        {
          fields: {
            a1: { key: "a1", value: "a1-e" },
            b1: { key: "b1", value: "b1-e" },
            c1: { key: "c1", value: null }
          },
          entityId: "e11"
        },
        {
          fields: {
            a2: { key: "a2", value: "a-3" },
            b2: { key: "b2", value: "b-3" },
            c2: { key: "c2", value: "c-3" }
          },
          entityId: "e13"
        }
      ]
    });
  });
});
