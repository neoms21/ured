const InitialState = {
    field1: 'abc',
    field2: 'def'
}
const fields = (state = InitialState, action) => {
    switch (action.type) {
        case "ACTION_TYPE_1":
            return state
        case "ACTION_TYPE_2":
            return state
        default:
            return state
    }
}


export default fields;