"use client"

export const fetchMindmap = async (id) => {
    const response = await fetch(`${process.env.API_SERVER}/${id}`);
    const data = await response.json();

    if (response.ok) {
        return { response, data }
    }
}

export const fetchSaveMindmap = async (body) => {
    try {
        const response = await fetch(`${process.env.API_SERVER}/${body.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    
        if (response.ok) return "ok";
        else return "error"
    }
    catch(e) {
        return "error"
    }
}