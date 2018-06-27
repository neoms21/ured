import * as actions from "../../../actions/actions";
import {
  fetchPortfolioIncome,
  savePortfolioIncome,
  addRegularPayment,
  removeRegularPayment,
  removeAllPayments
} from "./income-actions";
import { ADD_REGULAR_PAYMENT, REMOVE_REGULAR_PAYMENT, REMOVE_ALL_PAYMENTS } from "./income-action-types";

describe("income actions tests", () => {
  let mockFetch = jest.fn();

  afterEach(() => {
    mockFetch = jest.fn();
  });

  it("should call fetchFields", () => {
    actions.fetchFields = mockFetch;
    fetchPortfolioIncome("aa");

    expect(mockFetch).toHaveBeenCalledWith(
      "aa",
      "FETCH_PORTFOLIO_INCOME_SUCCESS",
      "FETCH_PORTFOLIO_INCOME_FAILURE"
    );
  });

  it("should call saveFields", () => {
    actions.saveListFields = mockFetch;
    savePortfolioIncome("aa");

    expect(mockFetch).toHaveBeenCalled();
  });

  it("should send add payment action", () => {
    const result = addRegularPayment({});

    expect(result).toEqual({
      type: ADD_REGULAR_PAYMENT,
      payload: { currentValues: {} }
    });
  });

  it("should send remove payment action", () => {
    const result = removeRegularPayment(2, {});

    expect(result).toEqual({
      type: REMOVE_REGULAR_PAYMENT,
      payload: { index: 2, currentValues: {} }
    });
  });

  it("should send remove all payments", () => {
    const result = removeAllPayments();

    expect(result).toEqual({
      type: REMOVE_ALL_PAYMENTS
    });
  });
});
