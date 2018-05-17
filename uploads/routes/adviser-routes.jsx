import React from "react";
import PrivateRoute from "./private-route";
import AdvisersContainer from "../modules/advisers/advisers-container";
import AccountantContainer from "../modules/advisers/accountant/accountant-container";
import LegalAdviserContainer from "../modules/advisers/legal-adviser/legal-adviser-container";
import ThirdPartyContainer from "../modules/advisers/third-party/third-party-container";

export default function() {
  return (
    <PrivateRoute
      path="/advisers"
      component={() => (
        <div>
          <AdvisersContainer>
            <PrivateRoute
              exact
              component={() => (
                <div>
                  <PrivateRoute
                    exact
                    path="/advisers/accountant"
                    component={AccountantContainer}
                  />
                  <PrivateRoute
                    exact
                    path="/advisers/legal-adviser"
                    component={LegalAdviserContainer}
                  />
                  <PrivateRoute
                    exact
                    path="/advisers/third-party"
                    component={ThirdPartyContainer}
                  />
                </div>
              )}
            />
          </AdvisersContainer>
        </div>
      )}
    />
  );
}
