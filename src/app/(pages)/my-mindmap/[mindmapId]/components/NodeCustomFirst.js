"use client"

import { stripHtml } from "@/app/utils/methods";
import { useRef, useState } from "react";
import { Handle, Position } from "reactflow";

const cssHandle = {
    position: "absolute",
    padding: "6px 20px",
    borderRadius: "3px",
    backgroundColor: "rgb(79,70,229)",
    outline: "1px solid white",
    bottom: "0px",
    translate: "0px 50%",
    zIndex: 2,
};

export default function NodeCustomFirst({ id, data, isConnectable, selected }) {
    const overlayRef = useRef(null);
    const inputContentRef = useRef(null);

    const { label, setNodes } = data;
    const [content, setContent] = useState(label);


    const handleDoubleClick = () => {
        inputContentRef.current.focus();
    }

    const handleChangeContent = (event) => {
        setContent(stripHtml(event.target.value));

        setNodes((currentNodes) => {
            const copy = [...currentNodes];
            copy[copy.findIndex(obj => obj.id === id)].data.label = event.target.value;
            return copy;
        });
    }

    const fillEmpty = (event) => {
        const element = event.target;
        const value = element.value.trim();

        if (!value.trim()) {
            element.value = "My Mindmap";
            
            setContent("My Mindmap");
            setNodes((currentNodes) => {
                const copy = [...currentNodes];
                copy[copy.findIndex(obj => obj.id === id)].data.label = "My Mindmap";
                return copy;
            });
        }
    }

    const handleBlur = (event) => {
        fillEmpty(event);
    }

    const handleKeyDown = (event) => {
        if (event.key !== "Enter") return;

        fillEmpty(event);
        inputContentRef.current.blur();
    }

    return (
        <div 
            className="node-custom"
            onDoubleClick={ handleDoubleClick }
            style={{ 
                backgroundColor: selected ? "rgb(191,195,74)" : "rgb(139,195,74)",
                zIndex: selected ? "-1" : "1",
            }}
        >
            <div className="main-content" >
                <div ref={ overlayRef } className="overlay"></div>
                <input ref={ inputContentRef } type="text" value={ content } onChange={ handleChangeContent } onBlur={ handleBlur } onKeyDown={ handleKeyDown } />
            </div>

            <Handle
                type="source"
                position={Position.Bottom}
                isConnectable={isConnectable}
                style={cssHandle}
            />
        </div>
    );
}