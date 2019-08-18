export const setSubscriptionsData = data => {
  return {
    type: 'SET_SUBSCRIPTIONS_DATA',
    payload: data
  };
};

export const removeSubscriptionData = data => {
  return {
    type: 'REMOVE_SUBSCRIPTION_DATA',
    payload: data
  };
};

export const getCurrencyData = () => {
  return {
    type: 'GET_CURRENCY_DATA'
  };
};

export const setSelectedCurrencyData = data => {
  return {
    type: 'SET_CURRENCY_DATA',
    payload: data
  };
};

export const setDefaultSortTypeData = data => {
  return {
    type: 'SET_DEFAULT_SORT_TYPE',
    payload: data
  };
};

export const setDefaultHighAlertAmountData = data => {
  return {
    type: 'SET_DEFAULT_HIGH_ALERT_AMOUNT',
    payload: data
  };
};
