"use client"

import { fetchAddMindmap } from '@/app/api/actions/handleClientSide';
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation';

export default function ButtonAddMindmap({ session }) {
    const router = useRouter();

    const handleClickAddMindmap = async () => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
        const day = ('0' + currentDate.getDate()).slice(-2);
        const hours = ('0' + currentDate.getHours()).slice(-2);
        const minutes = ('0' + currentDate.getMinutes()).slice(-2);
        const seconds = ('0' + currentDate.getSeconds()).slice(-2);
        const formattedTime = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds;

        const newMindmap = {
            id: uuidv4(),
            name: "Mindmap không có tên",
            desc: "Chưa có mô tả",
            nodes: [
                {
                    id: "root",
                    data: {
                        label: "My Mindmap"
                    },
                    position: {
                        x: 0,
                        y: 0
                    },
                    type: "nodeCustomFirst"
                }
            ],
            edges: [],
            isAccessible: false,
            email: session?.user?.email,
            created_at: formattedTime
        }
        
        const response = await fetchAddMindmap(newMindmap);
        if (response === "ok") {
            router.push(`/my-mindmap/${newMindmap.id}`)
        }
    }

    return (
        <button className="button-new-mindmap" onClick={ handleClickAddMindmap }>Thêm mới</button>
    )
}