import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/user";

const initialState: User = {
  _id: "",
  firstName: "",
  lastName: "",
  email: "",
  photoUrl: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
  age: null,
  gender: "",
  about: "",
  skills: [""],
  location: {
    type: "",
    coordinates: [null, null]
  }

}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_state, action)=>{
      return action.payload;
    },
    removeUser: (_state, _action)=>{
      return initialState;
    }
  }
})

export const {setUser, removeUser} = userSlice.actions;
export default userSlice.reducer;