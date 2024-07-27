import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  textlist:[]
}


export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },

    decrement: (state) => {
      console.log(state)
      if (state.value > 0) {
        state.value -= 1
      } else {
        state.value = 0
      }
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    textvalueUpdate:(state,action)=>{
      state.textlist.push(action.payload)
      
    },
    deleteTextValue: (state, action) => {
      state.textlist = state.textlist.filter((_, index) => index !== action.payload)
    }
    
  },
})

// export const counterSlicedec = createSlice({
//   name: 'counterxx',
//   initialState,
//   reducers: {
//     decered: (state) => {
//       state.value -= 1
//     },

//     // decrement: (state) => {
//     //   state.value -= 1
//     // },
//     // incrementByAmount: (state, action) => {
//     //   state.value += action.payload
//     // },
//   },
// })


export const { increment, decrement, incrementByAmount,textvalueUpdate,deleteTextValue } = counterSlice.actions
// export const { decered } = counterSlicedec.actions

export default counterSlice.reducer

// const reducers = {
//   counterSlice: counterSlice.reducer,
// };

// export default reducers;

