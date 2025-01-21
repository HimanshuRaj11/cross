import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL

export const fetchPost = createAsyncThunk("fetchPost", async () => {
    try {
        console.log(`${baseUrl}/api/v1/post/getAllPost`);
        console.log(baseUrl);


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
            .addCase(fetchPost.rejected, (state) => {
                state.loading = false;
            });
    }
});

export default PostSlice.reducer;