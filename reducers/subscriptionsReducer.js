const initialData = [];

const subscriptionsReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'SET_SUBSCRIPTIONS_DATA':
      return [...state, action.payload];
    case 'REMOVE_SUBSCRIPTION_DATA':
      return state.filter((item, index) => {
        if (index === action.payload) {
          return false;
        }
        return true;
      });
    default:
      return state;
  }
};

export default subscriptionsReducer;
