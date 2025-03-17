import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentDoctor: null,
  loading: false,
  error: null,
  success: false,
};

const doctorSlice = createSlice({
  name: "doctors",
  initialState,
  reducers: {
    setCurrentDoctor: (state, action) => {
      state.currentDoctor = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
});

export const { setCurrentDoctor, clearError, clearSuccess } =
  doctorSlice.actions;
export default doctorSlice.reducer;
