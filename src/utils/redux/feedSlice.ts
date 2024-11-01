import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";

const data: User[] = [];

const initialState = {
  data,
  message: "",
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 1,
    totalUsers: 0,
  }
}
const feedSlice = createSlice({
  name: "feed",
  initialState: initialState,
  reducers: {
    setFeed: (_state, action)=>{
      return action.payload;
    },
    removeFeedUser: (state, action)=>{
      return {
        ...state,
        data: state.data.filter(user=>user._id !== action.payload)
      }
    },
    removeFeed: ()=>{
      return initialState;
    }
  }
})

export const {setFeed, removeFeedUser, removeFeed} = feedSlice.actions;
export default feedSlice.reducer;