import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import themeReducer from "./themeSlice";
import feedReducer from "./feedSlice";
const appStore = configureStore({
  reducer:{
    user: userReducer,
    theme: themeReducer,
    feed: feedReducer

  }
})

export default appStore;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof appStore.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof appStore.dispatch

