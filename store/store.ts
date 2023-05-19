import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/store/slices/authSlice';
import mobileMenuReducer from '@/store/slices/mobileMenuSlice';
import preConstructionListingsReducer from '@/store/slices/preConstructionListingsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mobileMenu: mobileMenuReducer,
    preConstructionListings: preConstructionListingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
