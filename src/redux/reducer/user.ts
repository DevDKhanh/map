import { LAYERS, TITLELAYER } from "~/constants/enum";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface UserState {
  layerFocus: any;
  listDisplayLayer: any[];
  displayType: any;
  isDraw: boolean;
  data: any;
  center: any;
  drawSearch: any[];
  baseZoom: { center: any; zoom: number };
}

const initialState: UserState = {
  data: null,
  center: [-37.8201, 145.3443],
  drawSearch: [],
  isDraw: false,
  listDisplayLayer: [LAYERS.melbourneadmin],
  displayType: TITLELAYER.Terrain,
  layerFocus: "",
  baseZoom: { center: [-37.8201, 145.3443], zoom: 10 },
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
    setDisplayType: (state, action: PayloadAction<any>) => {
      state.displayType = action?.payload;
    },
    setLayerFocus: (state, action: PayloadAction<any>) => {
      state.layerFocus = action?.payload;
    },
    setBaseZoom: (state, action: PayloadAction<any>) => {
      state.baseZoom = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setData,
  setDisplayType,
  setCenterMap,
  setDrawSearch,
  setIsDraw,
  setDisplayLayer,
  setLayerFocus,
  setBaseZoom,
} = userSlice.actions;
export default userSlice.reducer;
