const initialData = 'USD ($)';

const setDefaultCurrencyReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'SET_CURRENCY_DATA':
      return action.payload;
    default:
      return state;
  }
};

export default setDefaultCurrencyReducer;
