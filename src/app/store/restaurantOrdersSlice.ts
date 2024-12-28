import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  restaurantId: null,
  orders: [],
  status: 'idle', // 'idle' | 'loading' | 'failed'
};

const restaurantOrdersSlice = createSlice({
  name: 'restaurantOrders',
  initialState,
  reducers: {
    setRestaurantId(state, action) {
      state.restaurantId = action.payload;
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const { setRestaurantId, setOrders, setStatus } = restaurantOrdersSlice.actions;
export default restaurantOrdersSlice.reducer;
