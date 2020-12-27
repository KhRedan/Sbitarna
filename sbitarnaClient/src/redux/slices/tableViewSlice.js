import { createSlice } from "@reduxjs/toolkit";

export const tableViewSlice = createSlice({
  name: "tableView",
  initialState: {
    headers: [],
    data: [],
    selected: null,
  },
  reducers: {
    setHeaders: (state, action) => {
      state.headers = action.payload;
    },
    addRow: (state, action) => {
      state.data.push(action.payload);
    },
    removeRow: (state, action) => {
      state.data = state.data.filter((el) => el.id != action.payload);
    },
    setRow: (state, action) => {
      state.data = state.data.map((el) =>
        el.id == action.payload.id ? { ...el, ...action.payload.content } : el
      );
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    removeData: (state, action) => {
      state.data = [];
    },
    removeHeaders: (state, action) => {
      state.headers = [];
    },
    setSelected: (state, action) => {
      state.selected = action.payload;
    },
    sortBy: (state, action) => {
      if (action.payload.direction) {
        state.data.sort((a, b) => {
          if (a[action.payload.header] < b[action.payload.header]) {
            return -1;
          } else if (a[action.payload.header] > b[action.payload.header]) {
            return 1;
          } else {
            return 0;
          }
        });
      } else {
        state.data.sort((a, b) => {
          if (a[action.payload.header] < b[action.payload.header]) {
            return 1;
          } else if (a[action.payload.header] > b[action.payload.header]) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    },
  },
});

export const {
  setHeaders,
  addRow,
  removeRow,
  setRow,
  setData,
  removeData,
  removeHeaders,
  setSelected,
  sortBy,
} = tableViewSlice.actions;

export const selectHeaders = (state) => state.tableView.headers;

export const selectData = (state) => state.tableView.data;

export const selectSelected = (state) => state.tableView.selected;

export default tableViewSlice.reducer;
