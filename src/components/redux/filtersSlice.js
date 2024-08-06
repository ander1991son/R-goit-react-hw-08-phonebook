// import { createSlice } from '@reduxjs/toolkit';

// const filtersInitialState = {
//   status: '',
// };

// const filtersSlice = createSlice({
//   name: 'filters',
//   initialState: filtersInitialState,
//   reducers: {
//     setFilter: (state, action) => {
//       state.status = action.payload;
//     },
//   },
// });

// export const { setFilter } = filtersSlice.actions;
// export default filtersSlice.reducer;

/////////////////  refactorizacion

import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: '',
  reducers: {
    setFilter: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFilter } = filtersSlice.actions;
export default filtersSlice.reducer;
