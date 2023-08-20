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
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setVisibility: (state, action: PayloadAction<string>) => {
      if (state.hasOwnProperty(action.payload)) {
        Object.keys(state).forEach((key) => {
          state[key as keyof layoutState] = key === action.payload;
        });
      }
    },
    resetVisibility: (state) => {
      Object.keys(state).forEach((key) => {
        state[key as keyof layoutState] = true;
      });
    },
  },
});

export const { setVisibility, resetVisibility } = layoutSlice.actions;
export default layoutSlice.reducer;
