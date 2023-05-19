import { createSlice } from '@reduxjs/toolkit';
import { Listing } from '@/types/types';

interface PreConstructionListingsState {
  preConstructionListings: Listing[];
  loading: boolean;
}

const initialState: PreConstructionListingsState = {
  preConstructionListings: [],
  loading: false,
};

const preConstructionListingsSlice = createSlice({
  name: 'preConstructionListings',
  initialState,
  reducers: {
    setPreConstructionListings: (state, action: { payload: Listing[] }) => {
      state.preConstructionListings = action.payload;
      state.loading = false;
    },
  },
});

export const { setPreConstructionListings } =
  preConstructionListingsSlice.actions;
export default preConstructionListingsSlice.reducer;
