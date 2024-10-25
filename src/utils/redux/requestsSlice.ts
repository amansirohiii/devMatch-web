import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";
interface Request {
  _id: string;
  fromUserId: User;
  toUserId: string;
  status: string
};
const initialState: Request[] = [];
const requestSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    setRequests: (_state, action)=>{
      return action.payload;
    },

    removeRequest: (state, action)=>{
      return state.filter((request)=>request._id !== action.payload
      );
    },

  }
});

export const {setRequests, removeRequest} = requestSlice.actions;
export default requestSlice.reducer;