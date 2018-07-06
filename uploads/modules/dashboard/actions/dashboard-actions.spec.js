import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import httpProxy from '../../../utils/httpProxy';
import sinon from 'sinon';
import {DASHBOARD_FETCH_FAILED, DASHBOARD_FETCH_SUCCESS} from "./dashboard-action-types";
import {fetchDashboardData} from "./dashboard-actions";

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

describe('async actions', () => {

    let proxyStub;

    afterEach(() => {
        proxyStub.restore();
    });

    it('creates DASHBOARD_FETCH_SUCCESS when fetching dashboard', (done) => {
        proxyStub = sinon.stub(httpProxy, "get");
        proxyStub.returns(new Promise(function (resolve) {
            resolve({data: {prop: 'abc'}})
        }));

        const expectedActions = [
            {type: DASHBOARD_FETCH_SUCCESS, payload: {prop: 'abc'}}
        ];

        const store = mockStore({todos: []});
        store.dispatch(fetchDashboardData()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });

    it('creates DASHBOARD_FETCH_FAILED when fetching dashboard', (done) => {
        proxyStub = sinon.stub(httpProxy, "get");

        proxyStub.returns(new Promise(function (resolve, reject) {
            reject({err: {error: 'error thrown'}})
        }));

        const expectedActions = [
            {type: DASHBOARD_FETCH_FAILED, payload: {"err": {"error": "error thrown"}}}
        ];

        const store = mockStore({todos: []});
        store.dispatch(fetchDashboardData()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
            done();
        });
    });
});