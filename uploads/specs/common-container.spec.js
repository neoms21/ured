import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import { definitions } from './container-definitions';

const mockStore = configureStore();

describe('All container tests', () => {
	describe('connected component tests', () => {
		let wrapper, store;

		it('maps state to props', () => {
			const defs = definitions;

			defs.forEach((d) => {
				console.log(`Running tests for ${d.name}`);
				store = mockStore(d.state);
				store.dispatch = jest.fn();
				const Component = d.component;
				wrapper = shallow(<Component store={store} />);
				expect(wrapper.props()).toEqual(expect.objectContaining(d.propsToCompare));
				d.functions.forEach((f) => {
					console.log(f.name);
					wrapper.props()[f.name](f.params);
				});

				d.calledWiths.forEach((c) => {
					expect(store.dispatch).toHaveBeenCalledWith(c);
				});
			});
		});
	});
});
