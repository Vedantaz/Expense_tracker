import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { 
    value: 0, 
    note: localStorage.getItem('note') || '',
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    multiply: (state, action)=>{
      if (state.value !== 0) {
        state.value *= action.payload;
      }
    },
    divide:  (state, action)=>{
      if (state.value !== 0) {
        state.value /= action.payload;
      }
    },
    setNote: (state, action)=>{
      state.note = action.payload;
      localStorage.setItem('note', action.payload);
    }
  },
});

export const { increment, decrement, incrementByAmount, multiply, divide, setNote } = counterSlice.actions;
export default counterSlice.reducer;
