import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth.slice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Ajoutez le reducer d'authentification au store
    // ...d'autres reducers si vous en avez
  },
});

export default store;
