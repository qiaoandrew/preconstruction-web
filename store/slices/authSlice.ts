import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types/types';

interface AuthState {
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.loading = false;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
