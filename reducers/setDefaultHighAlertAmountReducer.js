const initialData = '50';

const setDefaultHighAlertAmountReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'SET_DEFAULT_HIGH_ALERT_AMOUNT':
      return action.payload;
    default:
      return state;
  }
};

export default setDefaultHighAlertAmountReducer;
