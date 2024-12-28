import { configureStore } from '@reduxjs/toolkit';
import restaurantOrdersReducer from './restaurantOrdersSlice';

const store = configureStore({
  reducer: {
    restaurantOrders: restaurantOrdersReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
