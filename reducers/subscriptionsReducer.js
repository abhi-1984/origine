const subscriptionsReducer = (state = [], action) => {
  console.log('payload is is>>>', action.payload);
  switch (action.type) {
    case 'SET_SUBSCRIPTIONS_DATA':
      return state.push(action.payload);
    default:
      return state;
  }
};

export default subscriptionsReducer;
