const subscriptionsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_LINKS_DATA':
      return [...state, action.payload];
    default:
      return state;
  }
};

export default subscriptionsReducer;
