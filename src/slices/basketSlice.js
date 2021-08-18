import { createSlice } from "@reduxjs/toolkit";

/* Initialize state of the slice */
/* Has a global 'items' variable: */
const initialState = {
  items: [],
};

/* Slice for the basket: */
/* We create actions, that have an action we dispatch to the global store */
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    //Actions:
    addToBasket: (state, action) => {
      //manipulate items in the Global store
      //need to ensure the payload gets pushed in (it contains the product that is dispatched)
      state.items = [ ...state.items, action.payload ];
    },
    removeFromBasket: (state, action) => {},
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice:
export const selectItems = (state) => state.basket.items;

export default basketSlice.reducer;
