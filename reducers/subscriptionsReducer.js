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
    case 'UPDATE_SUBSCRIPTION_DATA':
      return state.map((item, index) => {
        if (item.name === action.payload.name) {
          return {
            ...item,
            ...action.payload
          };
        }
        return item;
      });
    default:
      return state;
  }
};

export default subscriptionsReducer;
