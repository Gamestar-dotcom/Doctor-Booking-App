import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clientSecret: null,
  amount: null,
  success: false,
  error: null,
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    clearPaymentState: (state) => {
      state.clientSecret = null;
      state.amount = null;
      state.success = false;
      state.error = null;
    },
    setPaymentSuccess: (state) => {
      state.success = true;
    },
  },
});

export const { clearPaymentState, setPaymentSuccess } = paymentSlice.actions;
export default paymentSlice.reducer;
