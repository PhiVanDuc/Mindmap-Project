import { createSlice } from "@reduxjs/toolkit";
import { fetchMindmapList, fetchUpdateMindmapList, fetchAddMindmapList, fetchDeleteMindmapList } from "../middlewares/fetchMindmapList";

const initialState = {
    mindmapList: [],
    status: 'idle'
}

export const mindmapSlice = createSlice({
    name: "mindmap",
    initialState,
    reducers: {
        updateMindmapList: (state, action) => {
            state.mindmapList = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchMindmapList.fulfilled, (state, action) => {
            state.mindmapList = action.payload
            state.status = "fulfilled"
        })
        .addCase(fetchMindmapList.pending, (state) => {
            state.status = "pending"
        })
        .addCase(fetchMindmapList.rejected, (state) => {
            state.status = "rejected"
        })
        .addCase(fetchUpdateMindmapList.fulfilled, (state, action) => {
            state.status = "fulfilled"
        })
        .addCase(fetchUpdateMindmapList.pending, (state) => {
            state.status = "pending"
        })
        .addCase(fetchUpdateMindmapList.rejected, (state) => {
            state.status = "rejected"
        })
        .addCase(fetchAddMindmapList.fulfilled, (state, action) => {
            state.status = "fulfilled"
        })
        .addCase(fetchAddMindmapList.pending, (state) => {
            state.status = "pending"
        })
        .addCase(fetchAddMindmapList.rejected, (state) => {
            state.status = "rejected"
        })
        .addCase(fetchDeleteMindmapList.fulfilled, (state, action) => {
            state.status = "fulfilled"
        })
        .addCase(fetchDeleteMindmapList.pending, (state) => {
            state.status = "pending"
        })
        .addCase(fetchDeleteMindmapList.rejected, (state) => {
            state.status = "rejected"
        })
    }
});