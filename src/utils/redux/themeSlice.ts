import { createSlice } from "@reduxjs/toolkit";
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem("theme");
  return savedTheme ? savedTheme : "light";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: getInitialTheme()
  },
  reducers: {
    setTheme: (state, action)=>{
      state.theme =  action.payload;
      localStorage.setItem("theme", action.payload);
    }
  }
})

export const {setTheme} = themeSlice.actions;
export default themeSlice.reducer;