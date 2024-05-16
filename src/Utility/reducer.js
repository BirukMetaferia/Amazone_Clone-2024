// Utility/reducer.js
export const initialState = {
  basket: [],
  // other initial state properties
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_BASKET':
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    // other case handlers
    default:
      return state;
  }
};
