import WealthObjectivesContainer from "../../modules/wealth-services/wealth-objectives/wealth-objectives-container";

export default {
  name: "wealth objectives container",
  component: WealthObjectivesContainer,
  state: {
    wealthPlanning: {
      fields: { a: { value: "a1" } },
      objectives: [{ id: 1, value: "one" }],
      loadComplete: true
    },
    tracker: { showTracker: true }
  },
  propsToCompare: { objectives: [{ id: 1, value: "one" }] },
  functions: [
    {
      name: "setTracker",
      params: "wealth-objectives"
    }
  ],
  calledWiths: [
    { type: "SET_ACTIVE_TRACKER_ITEM", payload: "wealth-objectives" }
  ]
};
