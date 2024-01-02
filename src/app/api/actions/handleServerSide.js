import { revalidateTag } from "next/cache";

export const fetchMindmapList = async () => {
    try {
        const response = await fetch(`${ process.env.API_SERVER }?_sort=created_at&_order=desc`, {
            next: {
                tags: ["get_mindmap_list"]
            }
        })
        return response.json();
    }
    catch(e) {
        return "error";
    }
}

export const fetchMindmap = async (id) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/${id}`, {
            next: {
                tags: ["get_mindmap"]
            }
        });

        revalidateTag("get_mindmap");
        return response.json();
    }
    catch (e) {
        return "error"
    }
}