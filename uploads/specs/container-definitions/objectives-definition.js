import ObjectivesContainer from '../../modules/investmentRisks/risk/objectives/objectives-container';
import { TOGGLE_OBJECTIVE, CLEAR_OTHER_OBJECTIVE } from '../../modules/investmentRisks/risk/risk-action-types';

export default {
	name: 'objectives container',
	component: ObjectivesContainer,
	state: { risk: { dataLoaded: true, fields: { a: {}, b: {} } }, tracker: { showTracker: true } },
	propsToCompare: { fields: { a: {}, b: {} }, showTracker: true },
	functions: [
		{
			name: 'setTracker',
			params: 'investment-objectives'
		}
	],
	calledWiths: [
        { payload: 'investment-objectives', type: 'SET_ACTIVE_TRACKER_ITEM' }
	]
};
