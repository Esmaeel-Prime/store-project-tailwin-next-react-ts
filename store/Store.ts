import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"; // Import your user reducer
import dashboardReducer from "./dashboard/dashboardSlice"; // Import your product reducer

export const store = configureStore({
  reducer: {
    user: userReducer,
    products: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
