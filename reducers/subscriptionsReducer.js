const initialData = [];

const subscriptionsReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'SET_SUBSCRIPTIONS_DATA':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default subscriptionsReducer;
