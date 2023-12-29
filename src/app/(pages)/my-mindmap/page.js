"use client"

import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useSession } from 'next-auth/react'

import { fetchAddMindmap, fetchMindmapList } from '@/redux/middlewares/fetchMindmapList'

import './style.scss'

export default function MyMindmapPage() {
    const router = useRouter();
    const { data: session } = useSession();

    const dispatch = useDispatch()
    const mindmapList = useSelector((state) => state.mindmap.mindmapList);
    const status = useSelector((state) => state.mindmap.status);

    useEffect(() => {
        dispatch(fetchMindmapList());
    }, [])

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
            flow: {
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
                edges: []
            },
            isAccessible: false,
            email: session?.user?.email,
            created_at: formattedTime
        }

        console.log("hello");

        dispatch(fetchAddMindmap(newMindmap));
        router.push(`/my-mindmap/${newMindmap.id}`)
    }

    return (
        <main className='my-mindmap-page'>
            <div className="container">
                <h1 className="my-mindmap-page-heading">Mindmap của tôi</h1>
                <button className="button-new-mindmap" onClick={ handleClickAddMindmap }>Thêm mới</button>

                <div className="table-recorded">
                    <header className='table-header'>
                        <div className="table-row">
                            <div className="table-data">
                                <input type="checkbox" />
                            </div>

                            <div className="table-data">
                                <p>TÊN</p>
                            </div>

                            <div className="table-data">
                                <p>TẠO LÚC</p>
                            </div>

                            <div className="table-data">
                                <p>HÀNH ĐỘNG</p>
                            </div>
                        </div>
                    </header>

                    <main className='table-body'>
                        {
                            mindmapList.length > 0 && (
                                mindmapList.map(({ id, name, desc, email, created_at }) => {
                                    if (email === session?.user?.email) {
                                        return (
                                            <div className="table-row" key={ id }>
                                                <div className="table-data">
                                                    <input type="checkbox" />
                                                </div>

                                                <div className="table-data">
                                                    <h4><Link href={ `/my-mindmap/${id}` }>{ name }</Link></h4>
                                                    <p>{ desc }</p>
                                                </div>

                                                <div className="table-data">
                                                    <p>{ created_at }</p>
                                                </div>

                                                <div className="table-data">
                                                    <span className='icon-edit'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                                            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                                        </svg>
                                                    </span>

                                                    <span className='icon-delete'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div> 
                                        )
                                    }
                                })
                            )
                        }
                    </main>
                </div>
            </div>
        </main>
    )
}