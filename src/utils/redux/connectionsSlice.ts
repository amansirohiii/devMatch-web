import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";
const initialState: User[] = [];
const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {
    setConnections: (_state, action)=>{
      return action.payload;
    },
    removeConnection: (state, action)=>{
      return state.filter((user)=>user._id !== action.payload);
    }
  }})
export const { setConnections, removeConnection } = connectionsSlice.actions;

export default connectionsSlice.reducer