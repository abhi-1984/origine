const initialData = 'Avg. Expenses';

const setDefaultTotalTypeReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'SET_DEFAULT_TOTAL_TYPE':
      return action.payload;
    default:
      return state;
  }
};

export default setDefaultTotalTypeReducer;
