import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/authSlice";
import doctorReducer from "./slice/doctorSlice"; // Doctor reducer
import appointmentReducer from "./slice/appointmentSlice"; // Appointment reducer
// import paymentReducer from "./slice/paymentSlice";
import { apiSlice } from "./api/apiSlice"; // Single API slice

// Persist auth state (optional)
const persistConfig = {
  key: "root",
  storage,
};
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // Persisted auth reducer
    doctors: doctorReducer, // Local doctor state
    appointments: appointmentReducer, // Local appointment state
    // payments: paymentReducer, // Local payment state
    [apiSlice.reducerPath]: apiSlice.reducer, // API reducer for RTK Query
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
export default store;
