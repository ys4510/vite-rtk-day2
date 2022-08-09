import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    decrement(state) {
      state.value--;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(counterAsync.pending, (state, action) => {
        console.log("pending.....!!!!");
      })
      .addCase(counterAsync.fulfilled, (state, action) => {
        state.value += action.payload;
      })
      .addCase(counterAsync.rejected, (state, action) => {
        console.log("rejected...");
      });
  },
});

export const counterAsync = createAsyncThunk<number>("counter/counterAsync", () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);

      // reject can be written like the followings:
      // reject (new Error('error!'));
      // reject('error !!!');
    }, 1000);
  });
});

// Action creators are generated for each case reducer function
export const { increment, decrement ,incrementByAmount} = counterSlice.actions;

export default counterSlice.reducer;
