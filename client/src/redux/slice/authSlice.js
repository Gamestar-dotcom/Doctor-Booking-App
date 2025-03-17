import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("Redux setUser triggered with:", action.payload); // Debugging log

      if (!action.payload) {
        console.error("setUser: user is undefined", action.payload);
        state.error = "User data is missing";
        return;
      }

      state.user = {
        ...action.payload, // This is already the user object
        ...(action.payload.role === "doctor" && {
          doctor: action.payload.doctor || null,
        }),
      };
      state.isAuthenticated = true;
      state.loading = false;

      state.user.doctorId = action.payload?.doctorId ?? null;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null; // Clear any existing errors
      localStorage.removeItem("token"); // Clear token on logout
      localStorage.removeItem("user");
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setUser, logout, setLoading, setError, clearError } =
  authSlice.actions;

export default authSlice.reducer;
