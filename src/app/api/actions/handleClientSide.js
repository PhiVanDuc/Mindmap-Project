"use server"

import { revalidateTag } from "next/cache"

export const fetchAddMindmap = async (body) => {
    const response = await fetch(`${ process.env.API }`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })

    if (response.ok) {
        revalidateTag("get_mindmap_list")
        return "ok";
    }
}

export const fetchDeleteMindmap = async (id) => {
    const response = await fetch(`${process.env.API}/${id}`, {
        method: "DELETE"
    })

    if (response.ok) {
        revalidateTag(["get_mindmap_list", "fetch-middleware"])
        return response.ok;
    }
    else return response.ok;
}