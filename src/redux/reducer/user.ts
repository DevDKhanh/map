import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  code: string | null;
  data: any;
  hiddenCalendar: boolean;
}

const initialState: UserState = {
  code: null,
  data: null,
  hiddenCalendar: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCode: (state, action: PayloadAction<string | null>) => {
      state.code = action?.payload;
    },
    setData: (state, action: PayloadAction<any>) => {
      state.data = action?.payload;
    },
    setHiddenCalendar: (state, action: PayloadAction<boolean>) => {
      state.hiddenCalendar = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCode, setData, setHiddenCalendar } = userSlice.actions;
export default userSlice.reducer;
