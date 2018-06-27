import React, { Component } from "react";
import configureStore from "./store/configureStore";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import { ConnectedRouter } from "react-router-redux";
import history from "./utils/history";
import HeaderContainer from "./modules/header/header-container";
import FooterContainer from "./modules/footer/footer-container";
import SubHeaderContainer from "./modules/sub-header/sub-header-container";
import BodyContainer from "./modules/body/body-container";
import LoginContainer from "./modules/login/login-container";
import { Provider } from "react-redux";
import AboutYouRoutes from "./routes/about-you-routes";
import FinancialRoutes from "./routes/financials-routes";
import TaxRoutes from "./routes/tax-routes";
import RiskRoutes from "./routes/risk-routes";
import WealthRoutes from "./routes/wealth-routes";
import GeneralRoutes from "./routes/general-routes";
import BankRoutes from "./routes/bank-routes";
import InvestmentMandateRoutes from "./routes/investment-routes";
import AdviserRoutes from "./routes/adviser-routes";
import "./sass/base.scss";
import PrivateRoute from "./routes/private-route";
import LoginRoute from "./routes/login-route";
import { loginSuccessful } from "./modules/login/login-actions";

import ExperienceContainer from "./modules/investmentRisks/experience/experience-container";

const store = configureStore();

export default class Root extends Component {
  componentDidMount() {
    const loginInfo = localStorage.getItem("user");
    if (loginInfo) {
      store.dispatch(loginSuccessful(JSON.parse(loginInfo)));
    }
  }

  render() {
    return <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <HeaderContainer />
            <SubHeaderContainer />

            <Switch>
              <LoginRoute exact path="/login" component={LoginContainer} />
              <BodyContainer>
                <GeneralRoutes />
                <AboutYouRoutes />
                <FinancialRoutes />
                <TaxRoutes />
                <PrivateRoute exact path="/investment-experience/investment-experience-1" component={ExperienceContainer} />
                <RiskRoutes />
                <WealthRoutes />
                <InvestmentMandateRoutes />
                <BankRoutes />
                <AdviserRoutes />
              </BodyContainer>

              <Route component={()=> <div>Not Found</div>} />
            </Switch>
            {/* <FooterContainer /> */}
          </div>
        </ConnectedRouter>
      </Provider>;
  }
}
