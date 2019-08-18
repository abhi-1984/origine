const initialData = 'Max. Amount';

const setDefaultSortTypeReducer = (state = initialData, action) => {
  switch (action.type) {
    case 'SET_DEFAULT_SORT_TYPE':
      return action.payload;
    default:
      return state;
  }
};

export default setDefaultSortTypeReducer;
