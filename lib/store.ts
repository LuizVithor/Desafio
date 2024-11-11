import authReducer from "./features/authSlice";
import dataReducer from "./features/dataSlice";
import titleReducer from "./features/titleSlice";
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/productsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    data: dataReducer,
    title: titleReducer,
    products: productsReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;