"use client"

import { fetchAddMindmapList } from "@/redux/middlewares/fetchMindmapList";
import Link from "next/link"
import { useSelector, useDispatch } from 'react-redux'
import { useSession } from "next-auth/react"

export default function MindmapButtonNew({ id }) {
    const mindmapList = useSelector((state) => state.mindmap.mindmapList);
    const dispatch = useDispatch();
    const { data: session } = useSession()


    const handleClickNewMindmap = () => {
        if (mindmapList.length > 0) {
            const index = mindmapList.findIndex(obj => obj.id === id)

            if (index > -1) return;

            const currentDate = new Date();
            const newMindmap = {
                id,
                name: "Mindmap chưa có tên",
                description: "Mindmap chưa có mô tả",
                flow: {
                    nodes: [
                        {
                            id: "1",
                            position: {
                                x: 0,
                                y: 0
                            },
                            data: {
                                nodeData: {
                                    current: [
                                        {
                                            id: "1",
                                            value: "Main Node"
                                        }
                                    ]
                                }
                            },
                            type: "nodeCustomFirst",
                        }
                    ],
                    edges: []
                },
                nodeData: [
                    {
                        id: "1",
                        value: "Mindmap"
                    }
                ],
                isAccessible: false,
                userEmail: session?.user?.email,
                created_at: currentDate.toISOString()
            }
            
            dispatch(fetchAddMindmapList(newMindmap))
        }

    }

    return (
        <Link href={`/my-mindmap/${id}`} className="button-new-mindmap" onClick={ handleClickNewMindmap }>Thêm mới</Link>
    )
}