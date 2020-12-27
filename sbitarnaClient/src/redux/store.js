import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';
import tableViewReducer from '../redux/slices/tableViewSlice';

export default configureStore({
  reducer: {
    user: userReducer,
    tableView: tableViewReducer,
  },
});
