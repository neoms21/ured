export const fetchAction = act => ({
    type: act,
    payload: { schema: { a: {}, b: {} }, data: {} }
});

export const saveAction = act => ({
    type: act,
    payload: { a: "a1", b: "b1" }
});

export const fetchResult = {
    fieldNames: ["a", "b"],
    fields: {
        a: { key: "a", value: undefined },
        b: { key: "b", value: undefined }
    },
   
    dataLoaded: true,
    schema: { a: {}, b: {} },
   
};

export const saveResult = {
    fieldNames: ["a", "b"],
    fields: {
        a: { key: "a", value: "a1" },
        b: { key: "b", value: "b1" }
    },
    schema: { a: {}, b: {} }
};