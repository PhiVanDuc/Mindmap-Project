export const fetchMindmapList = async () => {
    try {
        const response = await fetch(`${ process.env.API_SERVER }`, {
            next: {
                tags: ["get_mindmap_list"]
            }
        })
        return response.json();
    }
    catch(e) {
        return "Error " + e.message;
    }
}