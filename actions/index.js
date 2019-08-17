export const setSubscriptionsData = data => {
  console.log('data is>>>', data);
  return {
    type: 'SET_SUBSCRIPTIONS_DATA',
    payload: data
  };
};
