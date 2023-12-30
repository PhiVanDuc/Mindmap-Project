"use client"

import React, { useEffect, useState } from 'react';
import { fetchSaveMindmap } from '@/app/api/actions/handleFetchData';

import './style.scss'
import 'react-toastify/dist/ReactToastify.css';

export default function MindmapInfo({ mindmap, nodes, edges }) {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");

    useEffect(() => {
        if (Object.keys(mindmap.current).length > 0) {
            setName(mindmap.current.name);
            setDesc(mindmap.current.desc);
        }
    }, [mindmap.current]);

    const handleChangeName = (event) => {
        setName(event.target.value);
    }

    const handleChangeDesc = (event) => {
        setDesc(event.target.value);
    }

    const handleClickSave = async () => {
        const saveNodes = nodes.map((node) => {
            return {
                ...node,
                data: {
                    label: node.data.label
                }
            }
        })

        const save = {
            ...mindmap.current,
            name,
            desc,
            nodes: saveNodes,
            edges
        }

        const response = await fetchSaveMindmap(save);
        if (response.ok) {
            console.log('OK');
        }
    }

    return (
        <header className="mindmap-info">
            <div className="container">
                <div className="mindmap-inputs">
                    <input type="text" className="input-mindmap-name" value={ name } onChange={ handleChangeName } />
                    <textarea className="textarea-mindmap-desc" value={ desc } onChange={ handleChangeDesc }></textarea>
                </div>

                <div className="mindmap-buttons">
                    <button onClick={ handleClickSave }>
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