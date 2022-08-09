import React from "react";
import type { RootState } from "../../app/store";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { counterAsync, decrement, increment, incrementByAmount } from "./counterSlice";

export function Counter() {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div id="counter" >Counter: {count}</div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <button
          aria-label="Increment By Amount value"
          onClick={() => dispatch(incrementByAmount(10))}
        >
          Increment By Amount
        </button>
        <button
          aria-label="IncrementAsync value"
          onClick={() => dispatch(counterAsync())}
        >
          IncrementAsync
        </button>
      </div>
    </div>
  );
}

export default Counter;