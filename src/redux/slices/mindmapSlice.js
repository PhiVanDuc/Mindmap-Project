import { createSlice } from "@reduxjs/toolkit";
import { fetchMindmapList, fetchUpdateMindmap, fetchAddMindmap, fetchDeleteMindmap, fetchMindmapId } from "../middlewares/fetchMindmapList";

const initialState = {
    mindmapList: [],
    mindmap: {},
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
        .addCase(fetchUpdateMindmap.fulfilled, (state, action) => {
            state.status = "fulfilled"
        })
        .addCase(fetchUpdateMindmap.pending, (state) => {
            state.status = "pending"
        })
        .addCase(fetchUpdateMindmap.rejected, (state) => {
            state.status = "rejected"
        })
        .addCase(fetchAddMindmap.fulfilled, (state, action) => {
            state.status = "fulfilled"
        })
        .addCase(fetchAddMindmap.pending, (state) => {
            state.status = "pending"
        })
        .addCase(fetchAddMindmap.rejected, (state) => {
            state.status = "rejected"
        })
        .addCase(fetchDeleteMindmap.fulfilled, (state, action) => {
            state.status = "fulfilled"
        })
        .addCase(fetchDeleteMindmap.pending, (state) => {
            state.status = "pending"
        })
        .addCase(fetchDeleteMindmap.rejected, (state) => {
            state.status = "rejected"
        })
        .addCase(fetchMindmapId.fulfilled, (state, action) => {
            state.mindmap = action.payload
            state.status = "fulfilled"
        })
        .addCase(fetchMindmapId.pending, (state) => {
            state.status = "pending"
        })
        .addCase(fetchMindmapId.rejected, (state) => {
            state.status = "rejected"
        })
    }
});