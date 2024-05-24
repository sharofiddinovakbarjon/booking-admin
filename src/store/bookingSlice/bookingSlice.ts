import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  userInfo: UserInfo;
}

const initialState: State = {
  userInfo: {
    password: "",
    phone_number: "",
    token: "",
  },
};

export const bookingSlice = createSlice({
  name: "booskin",
  initialState,
  reducers: {
    // Set user info values
    setUserInfo: (state, { payload }: PayloadAction<UserInfo>) => {
      state.userInfo = payload;
    },
  },
});

export const { setUserInfo } = bookingSlice.actions;

export default bookingSlice.reducer;
