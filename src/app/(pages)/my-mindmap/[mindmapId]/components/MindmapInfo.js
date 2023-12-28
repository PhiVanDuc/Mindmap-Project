"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { fetchUpdateMindmapList } from "@/redux/middlewares/fetchMindmapList"

import './style.scss'
import 'react-toastify/dist/ReactToastify.css';

export default function MindmapInfo({ currentMindmap, nodeData, nodes, edges }) {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.mindmap.status);

    useEffect(() => {
        if (Object.keys(currentMindmap).length > 0) {
            setMindmapName(currentMindmap.name);
            setMindmapDesc(currentMindmap.description);
        }
    }, [currentMindmap]);

    const [mindmapName, setMindmapName] = useState(currentMindmap?.name || "");
    const [mindmapDesc, setMindmapDesc] = useState(currentMindmap?.description || "");

    const handleChangeMindmapName = (event) => {
        setMindmapName(event.target.value);
    }

    const handleChangeMindmapDesc = (event) => {
        setMindmapDesc(event.target.value);
    }

    const handleAutoIncreaseHeight = (event) => {
        event.target.style.height = event.target.scrollHeight + 'px';
    }

    const handleClickSaveMindmap = () => {
        let saveCurrentMindmap = {...currentMindmap};

        saveCurrentMindmap = {
            ...saveCurrentMindmap,
            flow: {
                nodes: [...nodes],
                edges: edges,
            },
            nodeData: nodeData.current,
            name: mindmapName,
            description: mindmapDesc,
        }

        dispatch(fetchUpdateMindmapList(saveCurrentMindmap));
        if (status === "rejected") {
            toast.error('Lưu mindmap thất bại!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
        else if (status === "fulfilled") {
            toast.success('Lưu mindmap thành công!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    return (
        <header className="mindmap-info">
            <div className="container">
                <div className="mindmap-inputs">
                    <input type="text" className="input-mindmap-name" value={ mindmapName } onChange={ handleChangeMindmapName } />
                    <textarea className="textarea-mindmap-desc" value={ mindmapDesc } onChange={ handleChangeMindmapDesc } onInput={ handleAutoIncreaseHeight }></textarea>
                </div>

                <div className="mindmap-buttons">
                    <button onClick={ handleClickSaveMindmap }>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                        </svg>
                        Lưu thay đổi
                    </button>

                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
                        </svg>
                        Chia sẻ
                    </button>
                </div>
            </div>
        </header>
    )
}