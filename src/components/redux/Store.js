// import { configureStore } from '@reduxjs/toolkit';
// import taskReducer from './taskSlice';
// import filtersReducer from './filtersSlice';

// const store = configureStore({
//   reducer: {
//     task: taskReducer,
//     filters: filtersReducer,
//   },
// });

// export default store;

//////////////    refactorizacion

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskSlice';
import filtersReducer from './filtersSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    filter: filtersReducer,
  },
});

export default store;
