import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUser as registerUserApi, loginUser as loginUserApi } from '../api/authService';

const initialState = {
  currentUser: null,
  token: localStorage.getItem('authToken') || null,
  status: 'idle',
  error: null,
  isHydrated: false, // Flag to know if auth state has been restored from storage
};

// Hydrate auth state from localStorage on app startup
export const hydrateAuth = createAsyncThunk(
  'user/hydrateAuth',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const userJson = localStorage.getItem('currentUser');

      if (token && userJson) {
        const user = JSON.parse(userJson);
        return { user, token };
      }
      return null;
    } catch (error) {
      console.error('Failed to hydrate auth:', error);
      return rejectWithValue('Unable to restore session.');
    }
  }
);

// Register new user
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserApi(userData);
      // response should contain: { id, firstName, lastName, email, token }
      const { token, ...user } = response.data;
      
      // Save to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Unable to register user.';
      return rejectWithValue(message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(credentials);
      // response should contain: { id, firstName, lastName, email, token }
      const { token, ...user } = response.data;
      
      // Save to localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Unable to login.';
      return rejectWithValue(message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
      // Also save to localStorage
      localStorage.setItem('currentUser', JSON.stringify(action.payload));
    },
    clearAuth(state) {
      state.currentUser = null;
      state.token = null;
      state.status = 'idle';
      state.error = null;
      state.isHydrated = true;
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
    },
  },
  extraReducers: (builder) => {
    builder
      // Hydrate
      .addCase(hydrateAuth.fulfilled, (state, action) => {
        state.isHydrated = true;
        if (action.payload) {
          state.currentUser = action.payload.user;
          state.token = action.payload.token;
          state.status = 'succeeded';
        } else {
          state.status = 'idle';
        }
      })
      .addCase(hydrateAuth.rejected, (state) => {
        state.isHydrated = true;
        state.status = 'idle';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.token = action.payload.token;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || action.error.message;
      });
  },
});

export const { setCurrentUser, clearAuth } = userSlice.actions;
export default userSlice.reducer;

