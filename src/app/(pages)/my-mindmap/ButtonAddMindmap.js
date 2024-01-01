"use client"

import { fetchAddMindmap } from '@/app/api/actions/handleClientSide';
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation';
import { Fragment, useState } from 'react';
import Loading from '@/app/utils/Loading';
import notify from '@/app/utils/notify';

export default function ButtonAddMindmap({ session }) {
    const [loading, setLoading] = useState(false);
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
            metadata: {
                name: "Mindmap không có tên",
                desc: "",
                image: "http://f8-mindmap.sanphamkythuat.online:880/_next/static/media/so-do-tu-duy.95dad645.jpg"
            },
            isAccessible: false,
            email: session?.user?.email,
            created_at: formattedTime
        }
        
        setLoading(true);
        const response = await fetchAddMindmap(newMindmap);
        
        if (response) {
            router.push(`/my-mindmap/${newMindmap.id}`)
            notify("success", "Tạo mindmap thành công!")
        }
        else {
            setLoading(false);
        }
    }

    return (
        <Fragment>
            <button className="button-new-mindmap" onClick={ handleClickAddMindmap }>Thêm mới</button>
        
            {
                loading && <Loading />
            }
        </Fragment>
    )
}