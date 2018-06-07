
import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  HIDE_LOGIN_ERROR
} from "./login-actoin-types";

import { push } from "react-router-redux";
import httpProxy from "../../utils/httpProxy";

export function login(data) {
  return dispatch => {
    //dispatch(itemsIsLoading(true));
    httpProxy
      .login(data)
      .then(response => {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("token", response.data.token);
        httpProxy.setAuthorization(response.data.token);
        dispatch(loginSuccessful(response.data));
        dispatch(push(response.data.lastPageSaved ? "/dashboard" : "/welcome"));
      })
      .catch(err => {
        dispatch(loginFailed(err));
      });
  };
}

export function logout() {
  return dispatch => {
    new Promise((resolve, reject) => {
      // We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
      // In this example, we use setTimeout(...) to simulate async code.
      // In reality, you will probably be using something like XHR or an HTML5 API.
      setTimeout(function() {
        dispatch(logoutSuccessful());
        dispatch(push("/login"));
      }, 1);
    });
  };
}

export function hideError() {
  return {
    type: HIDE_LOGIN_ERROR
  };
}

export function loginSuccessful(data) {
  return {
    type: LOGIN_SUCCESS,
    payload: data
  };
}
function logoutSuccessful() {
  return {
    type: LOGOUT
  };
}

function loginFailed(err) {
  return {
    type: LOGIN_FAILED,
    payload: err
  };
}
