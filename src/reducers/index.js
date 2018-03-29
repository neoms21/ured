import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import fields from './fields-reducer';

const rootReducer = combineReducers({
  form: reduxFormReducer,
  fields
});

export default rootReducer;
