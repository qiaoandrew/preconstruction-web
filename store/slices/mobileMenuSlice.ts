import { createSlice } from '@reduxjs/toolkit';

interface MobileMenuState {
  isOpen: boolean;
}

const initialState: MobileMenuState = {
  isOpen: false,
};

const mobileMenuSlice = createSlice({
  name: 'mobileMenu',
  initialState,
  reducers: {
    toggleMobileMenu: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { toggleMobileMenu } = mobileMenuSlice.actions;
export default mobileMenuSlice.reducer;
