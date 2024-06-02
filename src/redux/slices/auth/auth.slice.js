import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  authenticated: false,
  user: {},
  token: "",
};
const AuthSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    userAuthentication: (state, action) => {
      const { user, token } = action.payload;

      state.authenticated = true;
      state.user = user;
      state.token = token;
    },
    userLogout: (state) => {
      state.authenticated = false;
      state.user = {};
      state.token = "";
    },
    setUserData: (state, action) => {
      const { user } = action.payload;

      state.user = user;
    },
    setToken: () => {},
    getToken: () => {},
  },
});

export const AuthActions = AuthSlice.actions;
export default AuthSlice.reducer;
