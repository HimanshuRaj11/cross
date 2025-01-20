import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const fetchPost = createAsyncThunk("fetchPost", async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/api/v1/post/getAllPost`, { withCredentials: true })
        return data
    } catch (error) {
        return error
    }
})

const PostSlice = createSlice({
    name: "Post",
    initialState: {
        Posts: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
                state.loading = false;
                state.Posts = action.payload;
            })
            .addCase(fetchPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as any;
            });
    }
});

export default PostSlice.reducer;