import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { LAYERS } from "~/constants/enum";

interface UserState {
  layerFocus: any;
  listDisplayLayer: any[];
  isDraw: boolean;
  data: any;
  center: any;
  drawSearch: any[];
}

const initialState: UserState = {
  data: null,
  center: [-37.8201, 145.3443],
  drawSearch: [],
  isDraw: false,
  listDisplayLayer: [LAYERS.melbourneadmin],
  layerFocus: "",
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
    setDrawSearch: (state, action: PayloadAction<any>) => {
      state.drawSearch = action?.payload;
    },
    setIsDraw: (state, action: PayloadAction<any>) => {
      state.isDraw = action?.payload;
    },
    setDisplayLayer: (state, action: PayloadAction<any>) => {
      state.listDisplayLayer = action?.payload;
    },
    setLayerFocus: (state, action: PayloadAction<any>) => {
      state.layerFocus = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setData,
  setCenterMap,
  setDrawSearch,
  setIsDraw,
  setDisplayLayer,
  setLayerFocus,
} = userSlice.actions;
export default userSlice.reducer;
