import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import FormContainer from './containers/form-container';
import Sync from './forms/sync';

import Svg from './components/svg';
import Slider from './components/slider';
import Header from './components/header';


// import fontawesome from '@fortawesome/fontawesome'
// import FontAwesomeIcon from '@fortawesome/react-fontawesome'
// import brands from '@fortawesome/fontawesome-free-brands'
// import faCheckSquare from '@fortawesome/fontawesome-free-solid/faCheckSquare'
// import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'

// fontawesome.library.add(brands, faCheckSquare, faCoffee);

const store = configureStore();

const items = [
    {
        id: 1,
        selected: false,
        hoverOn: false
    }, {
        id: 2,
        selected: false,
        hoverOn: false
    }, {
        id: 3,
        selected: false,
        hoverOn: false
    }, {
        id: 4,
        selected: false,
        hoverOn: false
    }, {
        id: 5,
        selected: false,
        hoverOn: false
    }
]

export default class Root extends Component {

    static defaultProps = {
        global: {}
    };

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="wrapper">

                        <Header />
                        <div className="container-fluid">
                            <Switch>
                                <Route exact path="/" component={FormContainer} />
                                <Route exact path="/sync" component={Sync} />
                                <Route exact path="/svg" render={() => <Svg items={items} selectedRisk={3} />} />
                                <Route exact path="/slider" render={() => <Slider selectedValue={3} />} />

                            </Switch>
                        </div>
                    </div>
                </Router>
            </Provider>
        );
    }
}
