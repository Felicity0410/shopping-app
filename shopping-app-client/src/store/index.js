import {configureStore} from '@reduxjs/toolkit';
import {uiSlice} from './uiSlice';
import {cartSlice} from './cartSlice';
import { authSlice } from './authSlice';

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    auth: authSlice.reducer
  }
});