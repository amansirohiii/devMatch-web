import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";

const data: User[] = [];

const initialState = {
  data,
  message: "",
  pagination: {
    page: null,
    limit: null,
    totalPages: null,
    totalUsers: null,
  }
}
const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {
    setFeed: (_state, action)=>{
      return action.payload;
    },
    removeFeed: ()=>{
      return initialState;
    }
  }
})

export const {setFeed} = feedSlice.actions;
export default feedSlice.reducer;