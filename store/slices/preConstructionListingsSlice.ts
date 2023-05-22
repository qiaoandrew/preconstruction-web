import { createSlice } from '@reduxjs/toolkit';
import { ListingType } from '@/types/types';

interface PreConstructionListingsState {
  preConstructionListings: ListingType[];
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
    setPreConstructionListings: (state, action: { payload: ListingType[] }) => {
      state.preConstructionListings = action.payload;
      state.loading = false;
    },
  },
});

export const { setPreConstructionListings } =
  preConstructionListingsSlice.actions;
export default preConstructionListingsSlice.reducer;
