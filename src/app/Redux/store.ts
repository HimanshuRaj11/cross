import { configureStore } from '@reduxjs/toolkit';
import UserSlice from "./slice/userSlice";
import PostSlice from "./slice/PostSlice";

export const store = configureStore({
    reducer: {
        User: UserSlice,
        Posts: PostSlice
    }
})