"use client"

export const fetchSaveMindmap = async (body) => {
    try {
        const response = await fetch(`${process.env.API}/${body.id}`, {
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