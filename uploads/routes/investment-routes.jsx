import React from "react";
import PrivateRoute from "./private-route";
import InvestmentMandateContainer from "../modules/investment-mandate/investment-mandate-container";
import InvestmentServicesContainer from "../modules/investment-mandate/investment-service/investment-service-container";
import PortfolioChoiceContainer from "../modules/investment-mandate/choice/portfolio-choice-container";
import PortfolioRiskContainer from "../modules/investment-mandate/risk/portfolio-risk-container";
import ConfirmationContainer from "../modules/investment-mandate/confirmation/confirmation-container";
import Reporting from "../modules/investment-mandate/reporting/reporting";
import IsaDeclarationContainer from "../modules/investment-mandate/isa-declaration/isa-declaration-container";
import PortfolioIncomeContainer from "../modules/investment-mandate/income/income-container";

export default function() {
  return (
    <PrivateRoute
      path="/investment-mandate"
      component={() => (
        <div>
          <InvestmentMandateContainer>
            <PrivateRoute
              exact
              component={() => (
                <div>
                  <PrivateRoute
                    exact
                    path="/investment-mandate/investment-service"
                    component={InvestmentServicesContainer}
                  />
                  <PrivateRoute
                    exact
                    path="/investment-mandate/portfolio-choice"
                    component={PortfolioChoiceContainer}
                  />
                  <PrivateRoute
                    exact
                    path="/investment-mandate/reporting"
                    component={Reporting}
                  />
                  <PrivateRoute
                      exact
                      path="/investment-mandate/confirmation"
                      component={ConfirmationContainer}
                  />
                  <PrivateRoute
                      exact
                      path="/investment-mandate/isa-declaration"
                      component={IsaDeclarationContainer}
                  />
                  <PrivateRoute
                      exact
                      path="/investment-mandate/investment-risk"
                      component={PortfolioRiskContainer}
                  />
                  <PrivateRoute
                      exact
                      path="/investment-mandate/portfolio-income"
                      component={PortfolioIncomeContainer}
                  />
                </div>
              )}
            />
          </InvestmentMandateContainer>
        </div>
      )}
    />
  );
}
