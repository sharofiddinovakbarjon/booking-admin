import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface State {
  userInfo: UserInfo;
  cafeInfo: CafeInfo;
  cafeCreated: boolean;
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
    lattitude: "",
    longitude: "",
    start_working_time: "",
    end_working_time: "",
    id: "",
  },

  cafeCreated: false,
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

    // Set Cafe created
    setCafeCreated: (state, { payload }: PayloadAction<boolean>) => {
      state.cafeCreated = payload;
    },
  },
});

export const { setUserInfo, updateCafeInfo, setCafeCreated } =
  bookingSlice.actions;

export default bookingSlice.reducer;
