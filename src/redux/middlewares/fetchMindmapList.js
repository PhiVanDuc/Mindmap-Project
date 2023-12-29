import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMindmapList = createAsyncThunk("fetchMindmapList", async () => {
    const response = await fetch("https://mindmap.ndng.net/mindmap");
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else return []
})

export const fetchMindmapId = createAsyncThunk("fetchMindmapId", async (id) => {
    const response = await fetch(`https://mindmap.ndng.net/mindmap/${id}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else return {}
})

export const fetchAddMindmap = createAsyncThunk("fetchAddMindmapList", async (payload) => {
    const response = await fetch(`https://mindmap.ndng.net/mindmap`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
})

export const fetchUpdateMindmap = createAsyncThunk("fetchUpdateMindmapList", async (payload) => {
    const response = await fetch(`https://mindmap.ndng.net/mindmap/${payload.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
})

export const fetchDeleteMindmap = createAsyncThunk("fetchDeleteMindmapList", async (id) => {
    const response = await fetch(`https://mindmap.ndng.net/mindmap/${id}`, {
        method: "DELETE"
    });
})