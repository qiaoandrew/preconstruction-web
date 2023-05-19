import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  currentUser: {
    email: string | null;
    uid: string | null;
    displayName: string | null;
  } | null;
  loading: boolean;
}

const initialState: AuthState = {
  currentUser: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        uid: string | null;
        email: string | null;
        displayName: string | null;
      } | null>
    ) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
