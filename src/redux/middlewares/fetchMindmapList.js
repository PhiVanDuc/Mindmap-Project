import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMindmapList = createAsyncThunk("fetchMindmapList", async () => {
    const response = await fetch("https://z65x4n-8080.csb.app/mindmap");
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else return []
})

export const fetchMindmapId = createAsyncThunk("fetchMindmapId", async (id) => {
    const response = await fetch(`https://z65x4n-8080.csb.app/mindmap/${id}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    }
    else return {}
})

export const fetchAddMindmap = createAsyncThunk("fetchAddMindmapList", async (payload) => {
    const response = await fetch(`https://z65x4n-8080.csb.app/mindmap`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });
})

export const fetchUpdateMindmap = createAsyncThunk("fetchUpdateMindmapList", async (payload) => {
    const response = await fetch(`https://z65x4n-8080.csb.app/mindmap/${payload.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
})

export const fetchDeleteMindmap = createAsyncThunk("fetchDeleteMindmapList", async (id) => {
    const response = await fetch(`https://z65x4n-8080.csb.app/mindmap/${id}`, {
        method: "DELETE"
    });
})

// https://mindmap.ndng.net