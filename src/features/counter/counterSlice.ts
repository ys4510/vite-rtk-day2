import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { resolveModuleName } from "typescript";

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

    builder.addCase(incrementAsync.fulfilled, (state, action) => {
      state.value += action.payload;
    });
  },
});

export const incrementAsync = createAsyncThunk<number>(
  "counter/incrementAsync",
  async () => {
    // await 式はAsync Function内でのみ利用できます。 
    // await 式は右辺の Promise インスタンスがFulfilledまたはRejectedになるまで、
    // その行(文)で非同期処理の完了を待ちます。 
    // そして Promise インスタンスの状態が変わると、次の行(文)から処理を再開します。
    await  wait(1000);
    return 200;
  }
);

const wait = (ms = 0) => {
  // Promiseインスタンス
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

export const counterAsync = createAsyncThunk<number>(
  "counter/counterAsync",
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(1);

        // reject can be written like the followings:
        // reject (new Error('error!'));
        // reject('error !!!');
      }, 1000);
    });
  }
);

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
