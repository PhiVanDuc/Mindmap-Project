"use client"

import { useState, useRef, useEffect } from "react";
import { Handle, Position } from "reactflow";

const cssHandle = {
    position: "absolute",
    padding: "6px 20px",
    borderRadius: "3px",
    backgroundColor: "rgb(79,70,229)",
    outline: "1px solid white",
    bottom: "0px",
    translate: "0px 50%"
};

export default function NodeCustomFirst({ id, data, isConnectable }) {
    const {setNodes} = data;
    const [content, setContent] = useState(data.label);

    const nodeCustom = useRef(null);
    const overlay = useRef(null);
    const inputContent = useRef(null);
    const clickedOnNode = useRef(false);
    const doubleClick = useRef(false);

    const handleChange = (event) => {
        setContent(event.target.value);

        setNodes((currentNodes) => {
            const copy = [...currentNodes];
            copy[copy.findIndex(obj => obj.id === id)].data.label = event.target.value;
            return copy;
        });
    };

    const handleMainContentClick = (event) => {
        clickedOnNode.current = true;
        
        if (event.detail === 1) {
            nodeCustom.current.style.backgroundColor = "rgb(191,195,74)";
            doubleClick.current = false;
        }
        else if (event.detail === 2) {
            overlay.current.zIndex = "-1";
            inputContent.current.focus();
            doubleClick.current = true;
        }
    };

    const handleDocumentClick = (event) => {
        const target = event.target;
        const tagName = target.tagName.toLowerCase();

        if (!clickedOnNode.current) {
            if ((event.target.className === "overlay" && event.ctrlKey)  || (event.ctrlKey && tagName === "path")) return;
            nodeCustom.current.style.backgroundColor = "rgb(139,195,74)";
            overlay.current.zIndex = "1";
        }
        clickedOnNode.current = false;
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            inputContent.current.blur();
            nodeCustom.current.style.backgroundColor = "rgb(139,195,74)";
            overlay.current.zIndex = "1";
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <div 
            className="node-custom"
            onClick={handleMainContentClick}
            ref={nodeCustom}
        >
            <div className="main-content" >
                <div ref={ overlay } className="overlay" ></div>
                <input
                    ref={ inputContent }
                    type="text"
                    value={content}
                    onChange={handleChange}
                    onKeyDown={ handleKeyDown }
                />
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