import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface layoutState {
  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
  f: boolean;
  g: boolean;
  h: boolean;
  i: boolean;
  selected: string;
}

const initialState: layoutState = {
  a: true,
  b: true,
  c: true,
  d: true,
  e: true,
  f: true,
  g: true,
  h: true,
  i: true,
  selected: "",
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setVisibility: (
      state,
      action: PayloadAction<{ gridArea: string; visible: boolean }>
    ) => {
      const { gridArea, visible } = action.payload;
      if (gridArea === state.selected) {
        Object.keys(state).forEach((key) => {
          state[key] = true;
        });
        state.selected = "";
      } else {
        if (state.hasOwnProperty(gridArea)) {
          Object.keys(state).forEach((key) => {
            if (state[key] !== gridArea) {
              state[key] = key === gridArea ? visible : false;
              state.selected = gridArea;
            }
          });
        }
      }
    },
  },
});

export const { setVisibility } = layoutSlice.actions;
export default layoutSlice.reducer;
