// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Stockez ici les informations de l'utilisateur connecté
  isAuthenticated: false, // Un indicateur pour vérifier si l'utilisateur est authentifié
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
