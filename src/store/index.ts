import { configureStore } from "@reduxjs/toolkit";
import { apiRTK } from "./apiRTK";
import { setupListeners } from "@reduxjs/toolkit/query";
import bookingSlice from "./bookingSlice/bookingSlice";

export const store = configureStore({
  reducer: {
    bookingSlice,
    [apiRTK.reducerPath]: apiRTK.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiRTK.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
