import { configureStore } from "@reduxjs/toolkit";
import { mindmapSlice } from "./slices/mindmapSlice";

const store = configureStore({
    reducer: {
        mindmap: mindmapSlice.reducer
    },
    devTools: true
})
export default store