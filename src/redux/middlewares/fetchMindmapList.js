import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMindmapList = createAsyncThunk("fetchMindmapList", async () => {
    const response = await fetch("http://localhost:3001/mindmap");
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else return []
})

export const fetchUpdateMindmapList = createAsyncThunk("fetchUpdateMindmapList", async (payload) => {
    const response = await fetch(`http://localhost:3001/mindmap/${payload.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
})

export const fetchAddMindmapList = createAsyncThunk("fetchAddMindmapList", async (payload) => {
    const response = await fetch(`http://localhost:3001/mindmap`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
})

export const fetchDeleteMindmapList = createAsyncThunk("fetchDeleteMindmapList", async (payload) => {
    const response = await fetch(`http://localhost:3001/mindmap/${payload}`, {
        method: "DELETE"
    });
})