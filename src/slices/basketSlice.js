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
    removeFromBasket: (state, action) => {
      //look for index of the item we want to remove...
      const index = state.items.findIndex( basketItem => basketItem.id === action.payload.id );

      //make a copy of current basket
      let newBasket = [...state.items];

      //index will return a numeral value of where item exists in the array-> will be greater than 0 if it exists...
      if (index >= 0) {
        //The item exists in the basket- remove it...
        newBasket.splice(index, 1)
      } else {
        console.warn(`Can't remove product (id: ${action.payload.id}) as it is not in the basket`)
      }

      state.items = newBasket;
    },
  },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice:
export const selectItems = (state) => state.basket.items;

export default basketSlice.reducer;
