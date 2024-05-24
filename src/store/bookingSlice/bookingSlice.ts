import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  userInfo: UserInfo;
  cafeInfo: CafeInfo;
}

const initialState: State = {
  userInfo: {
    password: "",
    phone_number: "",
    token: "",
  },
  cafeInfo: {
    name: "",
    phone_number: "",
    logo_url: "",
    image_url: "",
    address: "",
    has_alcohol: false,
    lattitude: null,
    longitude: null,
    start_working_time: null,
    end_working_time: null,
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

    // Update Cafe Info
    updateCafeInfo: (state, { payload }: PayloadAction<CafeInfo>) => {
      state.cafeInfo = payload;
    },
  },
});

export const { setUserInfo, updateCafeInfo } = bookingSlice.actions;

export default bookingSlice.reducer;
