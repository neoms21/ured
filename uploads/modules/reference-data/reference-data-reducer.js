import { FETCH_LISTS_SUCCESS } from "./../../actions/action-types";

const initialState = {
  riskReturn: [
    {
      id: 1,
      returnText: "Lower",
      risk: "Low",
      value:
        "I want to keep the capital safe and will accept commensurately lower returns available from low risk investments"
    },
    {
      id: 2,
      returnText: "In line with inflation",
      risk: "Limited",
      value:
        "I am risk averse but will accept a limited degree of risk in order to grow my assets in line with inflation over the medium to long term"
    },
    {
      id: 3,
      returnText: "Marginally ahead of inflation",
      risk: "Moderate",
      value:
        "I am willing to accept a higher degree of risk in order to grow my assets materially ahead of inflation over the medium to long term"
    },
    {
      id: 4,
      returnText: "Materially ahead of inflation",
      risk: "High",
      value:
        "I am willing to accept a moderate degree of risk in order to grow my assets marginally ahead of inflation over the medium to long term"
    },
    {
      id: 5,
      returnText: "Maximum",
      risk: "Very high",
      value:
        "I am seeking to maximise returns and am willing to accept a high degree of risk in order to target this objective"
    }
  ]
};

export default function about(state = initialState, action = "") {
  switch (action.type) {
    case FETCH_LISTS_SUCCESS: {
      const keys = Object.keys(action.payload);
      let newLists = {};
      keys.forEach(k => {
        newLists = {
          ...newLists,
          [k]:
            action.payload[k] && k === "countries"
              ? arrangeCountries(action.payload[k])
              : action.payload[k]
        };
        // action.payload[k] ? action.payload[k] : state.lists[k];
      });
      return { ...state, ...newLists };
    }

    default:
      return state;
  }
}

function arrangeCountries(arr) {
  if (!arr) return arr;
  const ukCountryItem = arr.find(a => a.code === "GBR");
  const ukIndex = arr.indexOf(ukCountryItem);
  arr.splice(ukIndex, 1);
  arr.splice(0, 0, ukCountryItem);
  return arr;
}
