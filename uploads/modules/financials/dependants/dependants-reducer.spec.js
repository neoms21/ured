import reducer from "./dependants-reducer";
import {
  REMOVE_DEPENDANT,
  FETCH_DEPENDANTS_SUCCESS,
  ADD_DEPENDANT,
  SAVE_DEPENDANTS_SUCCESS
} from "./dependants-action-types";

describe("Dependants Reducer", () => {
  let schema = {
    a: { type: "text", label: "label a" },
    b: { type: "date", label: "label b" },
    c: { type: "text", label: "label c" }
  };

  it("should return the initial state on default action", () => {
    const result = reducer();
    expect(result).toEqual({
      fieldNames: [],
      dataLoaded: false,
      saved: false,
      fields: {},
      dependants: [],
      repetitions:0,
      maxRepeats: 4
    });
  });

  it("should map the fetched response to state", () => {
    const state = {};

    const result = reducer(state, {
      type: FETCH_DEPENDANTS_SUCCESS,
      payload: {
        complete: true,
        schema: schema,
        data: {
          dependants: [
            {
              a: "a1",
              b: "2013-02-21",
              c: "c1",
              entityId: "1"
            },
            {
              a: "a2",
              b: "2013-06-21",
              c: "c2",
              entityId: "2"
            }
          ]
        }
      }
    });

    expect(result).toEqual({
      schema: schema,
      fieldNames: ["a", "b", "c"],
      dependants: [
        {
          fields: {
            a1: {
              key: "a1",
              label: "label a",
              type: "text",
              value: "a1"
            },
            b1: {
              key: "b1",
              label: "label b",
              type: "date",
              value: "21/02/2013"
            },
            c1: {
              key: "c1",
              label: "label c",
              type: "text",
              value: "c1"
            }
          },
          entityId: "1"
        },
        {
          fields: {
            a2: {
              key: "a2",
              label: "label a",
              type: "text",
              value: "a2"
            },
            b2: {
              key: "b2",
              label: "label b",
              type: "date",
              value: "21/06/2013"
            },
            c2: {
              key: "c2",
              label: "label c",
              type: "text",
              value: "c2"
            }
          },
          entityId: "2"
        }
      ],
      dataLoaded: true,
      repetitions: 2,
      saved: true
    });
  });

  it("should not create an empty structure when there is no data", () => {
    const state = { repetitions: 2 };
    const result = reducer(state, {
      type: FETCH_DEPENDANTS_SUCCESS,
      payload: {
        complete: true,
        schema: schema,
        data: {}
      }
    });

    expect(result).toEqual({
      schema: schema,
      fieldNames: ["a", "b", "c"],
      dependants: [],
      dataLoaded: true,
      repetitions: 0,
      saved: true
    });
  });

  it("should add en extra dependant", () => {
    const state = {
      schema: schema,
      dependants: [],
      repetitions: 0
    };
    const result = reducer(state, {
      type: ADD_DEPENDANT,
      payload: { currentValues: {} }
    });

    expect(result).toEqual({
      repetitions: 1,
      schema: schema,
      dependants: [
        {
          fields: {
            a1: {
              key: "a1",
              label: "label a",
              type: "text",
              value: undefined
            },
            b1: {
              key: "b1",
              label: "label b",
              type: "date",
              value: undefined
            },
            c1: {
              key: "c1",
              label: "label c",
              type: "text",
              value: undefined
            }
          }
        }
      ]
    });

    const result2 = reducer(result, {
      type: ADD_DEPENDANT,
      payload: { currentValues: { a1: "a11", b1: "211", c1: "011" } }
    });

    expect(result2).toEqual({
      repetitions: 2,
      schema: schema,
      dependants: [
        {
          fields: {
            a1: {
              key: "a1",
              label: "label a",
              type: "text",
              value: "a11"
            },
            b1: {
              key: "b1",
              label: "label b",
              type: "date",
              value: "211"
            },
            c1: {
              key: "c1",
              label: "label c",
              type: "text",
              value: "011"
            }
          }
        },
        {
          fields: {
            a2: {
              key: "a2",
              label: "label a",
              type: "text",
              value: undefined
            },
            b2: {
              key: "b2",
              label: "label b",
              type: "date",
              value: undefined
            },
            c2: {
              key: "c2",
              label: "label c",
              type: "text",
              value: undefined
            }
          }
        }
      ]
    });
  });

  it("should remove the dependant", () => {
    const state = {
      schema: schema,
      dependants: [
        {
          fields: {
            a1: {
              key: "a1",
              label: "label a",
              type: "text",
              value: undefined
            },
            b1: {
              key: "b1",
              label: "label b",
              type: "date",
              value: undefined
            },
            c1: {
              key: "c1",
              label: "label c",
              type: "text",
              value: undefined
            }
          }
        }
      ],
      repetitions: 1
    };
    const result = reducer(state, {
      type: REMOVE_DEPENDANT,
      payload: { index: 1 }
    });

    expect(result).toEqual({
      repetitions: 0,
      schema: schema,
      dependants: []
    });
  });

  it("should update the state after new save", () => {
    const state = {
      dependants: [],
      schema: {
        a: { label: "lbl a", type: "xxx" },
        b: { label: "lbl b", type: "xxx" },
        c: { label: "lbl c", type: "xxx" }
      }
    };

    const result = reducer(state, {
      type: SAVE_DEPENDANTS_SUCCESS,
      payload: {
        request: { dependants: [{ a: "a1", b: "b1", c: "c1" }] },
        entityIds: ["e11"]
      }
    });

    expect(result).toEqual({
      schema: {
        a: { label: "lbl a", type: "xxx" },
        b: { label: "lbl b", type: "xxx" },
        c: { label: "lbl c", type: "xxx" }
      },
      dependants: [
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
      dependants: [
        { fields: { a1: "a1", b1: "b1", c1: "c1", entityId: "e11" } }
      ],
      schema: { a: {}, b: {}, c: {} }
    };

    const result = reducer(state, {
      type: SAVE_DEPENDANTS_SUCCESS,
      payload: {
        request: {
          dependants: [{ a: "a1-e", b: "b1-e", c: null, entityId: "e11" }]
        },
        entityIds: ["e11"]
      }
    });

    expect(result).toEqual({
      schema: { a: {}, b: {}, c: {} },
      dependants: [
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

  it("should remove the dependants marked as deleted", () => {
    const state = {
      dependants: [
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
      type: SAVE_DEPENDANTS_SUCCESS,
      payload: {
        request: {
          dependants: [
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
      dependants: [
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

  it("should remove the dependant and copy the higher index to lower ones", () => {
    const state = {
      schema: schema,
      dependants: [
        {
          fields: {
            a1: { key: "a1", label: "label a", type: "text", value: undefined },
            b1: { key: "b1", label: "label b", type: "date", value: undefined },
            c1: { key: "c1", label: "label c", type: "text", value: undefined }
          }
        },
        {
          fields: {
            a2: { key: "a2", label: "label a", type: "text", value: undefined },
            b2: { key: "b2", label: "label b", type: "date", value: undefined },
            c2: { key: "c2", label: "label c", type: "text", value: undefined }
          }
        },
        {
          fields: {
            a3: { key: "a3", label: "label a", type: "text", value: undefined },
            b3: { key: "b3", label: "label b", type: "date", value: undefined },
            c3: { key: "c3", label: "label c", type: "text", value: undefined }
          }
        },
        {
          fields: {
            a4: { key: "a4", label: "label a", type: "text", value: undefined },
            b4: { key: "b4", label: "label b", type: "date", value: undefined },
            c4: { key: "c4", label: "label c", type: "text", value: undefined }
          }
        }
      ],
      repetitions: 4
    };
    const result = reducer(state, {
      type: REMOVE_DEPENDANT,
      payload: { index: 1, currentValues: { a3: "a33", b3: "b33", c3: "c33" } }
    });

    expect(result).toEqual({
      repetitions: 3,
      schema: schema,
      dependants: [
        {
          fields: {
            a1: { key: "a1", label: "label a", type: "text", value: undefined },
            b1: { key: "b1", label: "label b", type: "date", value: undefined },
            c1: { key: "c1", label: "label c", type: "text", value: undefined }
          }
        },
        {
          fields: {
            a2: { key: "a2", label: "label a", type: "text", value: "a33" },
            b2: { key: "b2", label: "label b", type: "date", value: "b33" },
            c2: { key: "c2", label: "label c", type: "text", value: "c33" }
          }
        },
        {
          fields: {
            a3: { key: "a3", label: "label a", type: "text", value: undefined },
            b3: { key: "b3", label: "label b", type: "date", value: undefined },
            c3: { key: "c3", label: "label c", type: "text", value: undefined }
          }
        }
      ]
    });
  });

  it("should remove the dependant from middle and copy the higher index to lower ones", () => {
    const state = {
      schema: schema,
      dependants: [
        {
          fields: {
            a1: { key: "a1", label: "label a", type: "text", value: undefined },
            b1: { key: "b1", label: "label b", type: "date", value: undefined },
            c1: { key: "c1", label: "label c", type: "text", value: undefined }
          }
        },
        {
          fields: {
            a2: { key: "a2", label: "label a", type: "text", value: undefined },
            b2: { key: "b2", label: "label b", type: "date", value: undefined },
            c2: { key: "c2", label: "label c", type: "text", value: undefined }
          }
        },
        {
          fields: {
            a3: { key: "a3", label: "label a", type: "text", value: undefined },
            b3: { key: "b3", label: "label b", type: "date", value: undefined },
            c3: { key: "c3", label: "label c", type: "text", value: undefined }
          }
        },
        {
          fields: {
            a4: { key: "a4", label: "label a", type: "text", value: "a4" },
            b4: { key: "b4", label: "label b", type: "date", value: "b4" },
            c4: { key: "c4", label: "label c", type: "text", value: "c4" }
          }
        }
      ],
      repetitions: 4
    };
    const result = reducer(state, {
      type: REMOVE_DEPENDANT,
      payload: { index: 3, currentValues: { a4: "a4", b4: "b4", c4: "c4" } }
    });

    expect(result).toEqual({
      repetitions: 3,
      schema: schema,
      dependants: [
        {
          fields: {
            a1: { key: "a1", label: "label a", type: "text", value: undefined },
            b1: { key: "b1", label: "label b", type: "date", value: undefined },
            c1: { key: "c1", label: "label c", type: "text", value: undefined }
          }
        },
        {
          fields: {
            a2: { key: "a2", label: "label a", type: "text", value: undefined },
            b2: { key: "b2", label: "label b", type: "date", value: undefined },
            c2: { key: "c2", label: "label c", type: "text", value: undefined }
          }
        },
        {
          fields: {
            a3: { key: "a3", label: "label a", type: "text", value: "a4" },
            b3: { key: "b3", label: "label b", type: "date", value: "b4" },
            c3: { key: "c3", label: "label c", type: "text", value: "c4" }
          }
        }
      ]
    });
  });

  it("should remove the item with entityId and update the fields", () => {
    const state = {
      dependants: [
        { fields: { a1: {value:"a1"}, b1: {value:"b1"}, c1: {value:"c1"} }, entityId: "e11" },
        {
          fields: { a2: {value:"a2"}, b2: {value:"b2"}, c2: {value:"c3" }},
          entityId: "e12"
        },
        { fields: { a3: {value:"a3"}, b3: {value:"b3"}, c3: {value:"c3"} }, entityId: "e13" }
      ],
      repetitions: 3,
      schema: { a: {}, b: {}, c: {} }
    };

    const result = reducer(state, {
      type: REMOVE_DEPENDANT,
      payload: {
        index: 2, currentValues:{
          a1: "a1",
          b1: "b1",
          c1: "c1",
          a2: "a2",
          b2: "b2",
          c2: "c2",
          a3: "a3",
          b3: "b3",
          c3: "c3",
        }
      }
    });

    expect(result).toEqual({
      schema: { a: {}, b: {}, c: {} },
      repetitions: 2,
      dependants: [
        { fields: { a1: {value:"a1"}, b1: {value:"b1"}, c1: {value:"c1"} }, entityId: "e11" },
        {
          fields: { a2: {value:"a2"}, b2: {value:"b2"}, c2: {value:"c3" }},
          entityId: "e12", delete:true
        },
        { fields: { a2: {value:"a3", key:"a2"}, b2: {value:"b3", key:"b2"}, c2: {value:"c3", key:"c2"} }, entityId: "e13" }
      ]
    });
  });
});
