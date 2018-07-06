import httpProxy from "../../../utils/httpProxy";
import {
  DASHBOARD_FETCH_FAILED,
  DASHBOARD_FETCH_SUCCESS
} from "./dashboard-action-types";

export function fetchDashboardData() {
  return dispatch => {
    //dispatch(itemsIsLoading(true));
    return httpProxy
      .get("dashboard")
      .then(response => dispatch(dashboardFetchedSuccessfully(response.data)))
      .catch(err => {
        console.error(err);
        dispatch(dashboardFetchFailed(err));
      });
  };
}

function dashboardFetchedSuccessfully(data) {
  return {
    type: DASHBOARD_FETCH_SUCCESS,
    payload: data
  };
}

function dashboardFetchFailed(data) {
  return {
    type: DASHBOARD_FETCH_FAILED,
    payload: data
  };
}
