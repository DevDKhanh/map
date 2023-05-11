import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  data: any;
}

const initialState: UserState = {
  data: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any>) => {
      state.data = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setData } = userSlice.actions;
export default userSlice.reducer;
