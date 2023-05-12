import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  data: any;
  center: any;
}

const initialState: UserState = {
  data: null,
  center: [-37.8201, 145.3443],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.data = action?.payload;
    },
    setCenterMap: (state, action: PayloadAction<any>) => {
      state.center = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData, setCenterMap } = userSlice.actions;
export default userSlice.reducer;
