import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, setAuthToken } from '../../lib/api';

// charger depuis localStorage si dispo
const saved = (() => {
  try { return JSON.parse(localStorage.getItem('tk_auth') || 'null'); } catch { return null; }
})();

if (saved?.token) setAuthToken(saved.token);

// Thunks
export const registerUser = createAsyncThunk('auth/register', async (payload, { rejectWithValue }) => {
  try {
    await api.post('/api/auth/register', payload);
    return true;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || 'Registration failed');
  }
});

export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const { data } = await api.post('/api/auth/login', { email, password }); // { token, user }
    return data;
  } catch (err) {
    return rejectWithValue(err?.response?.data?.message || 'Invalid credentials');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: saved?.token || null,
    user: saved?.user || null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('tk_auth');
      setAuthToken(null);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(registerUser.fulfilled, (s) => { s.status = 'succeeded'; })
      .addCase(registerUser.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload || 'Registration failed'; })

      .addCase(loginUser.pending, (s) => { s.status = 'loading'; s.error = null; })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.status = 'succeeded';
        s.token = a.payload.token;
        s.user  = a.payload.user;
        setAuthToken(s.token);
        localStorage.setItem('tk_auth', JSON.stringify({ token: s.token, user: s.user }));
      })
      .addCase(loginUser.rejected, (s, a) => { s.status = 'failed'; s.error = a.payload || 'Login failed'; });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;