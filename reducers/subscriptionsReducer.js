const initialData = [];

const subscriptionsReducer = (state = initialData, action) => {
  console.log('payload is is>>>', action.payload);
  switch (action.type) {
    case 'SET_SUBSCRIPTIONS_DATA':
      return initialData.push(action.payload);
    default:
      return state;
  }
};

export default subscriptionsReducer;
