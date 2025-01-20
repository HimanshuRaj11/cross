import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL


export const Fetchuser = createAsyncThunk("Fetchuser", async () => {
    try {
        const res = await axios.get(`${baseUrl}/api/v1/user`);

        return res.data;
    } catch (error) {
        throw error;
    }
});

const UserSlice = createSlice({
    name: "User",
    initialState: {
        User: {},
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(Fetchuser.pending, (state) => {
                state.loading = true;
            })
            .addCase(Fetchuser.fulfilled, (state, action) => {
                state.loading = false;
                state.User = action.payload;
            })
            .addCase(Fetchuser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message as any;
            });
    }
});

export default UserSlice.reducer;