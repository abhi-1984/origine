import { combineReducers } from 'redux';
import subscriptionsReducer from './subscriptionsReducer';
import currencyReducer from './currencyReducer';
import setDefaultCurrencyReducer from './setDefaultCurrencyReducer';
import setDefaultSortTypeReducer from './setDefaultSortTypeReducer';
import setDefaultHighAlertAmountReducer from './setDefaultHighAlertAmountReducer';

const rootReducer = combineReducers({
  subscriptionsReducer,
  currencyReducer,
  setDefaultCurrencyReducer,
  setDefaultSortTypeReducer,
  setDefaultHighAlertAmountReducer
});

export default rootReducer;
