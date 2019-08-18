import { combineReducers } from 'redux';
import subscriptionsReducer from './subscriptionsReducer';
import currencyReducer from './currencyReducer';
import setDefaultCurrencyReducer from './setDefaultCurrencyReducer';
import setDefaultTotalTypeReducer from './setDefaultTotalTypeReducer';
import setDefaultSortTypeReducer from './setDefaultSortTypeReducer';
import setDefaultHighAlertAmountReducer from './setDefaultHighAlertAmountReducer';

const rootReducer = combineReducers({
  subscriptionsReducer,
  currencyReducer,
  setDefaultCurrencyReducer,
  setDefaultTotalTypeReducer,
  setDefaultSortTypeReducer,
  setDefaultHighAlertAmountReducer
});

export default rootReducer;
