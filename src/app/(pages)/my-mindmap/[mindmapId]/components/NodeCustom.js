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

export default function NodeCustom({ id, data, isConnectable }) {
    const skip = useRef(false);
    const { nodeData } = data;

    useEffect(() => {
        if (!skip.current) {
            skip.current = true;
            return;
        }

        const updateNodeData = [...nodeData.current];
        updateNodeData.push({id, value: `Node ${id}`});
        nodeData.current = updateNodeData;
        setContent(() => {
            const index = nodeData.current.findIndex(obj => obj.id == id);
            return nodeData.current[index].value
        })
    }, []);

    const [content, setContent] = useState(() => {
        const index = nodeData.current.findIndex(obj => obj.id == id);
        return nodeData.current[index]?.value || ''
    });

    const nodeCustom = useRef(null);
    const overlay = useRef(null);
    const inputContent = useRef(null);
    const clickedOnNode = useRef(false);
    const doubleClick = useRef(false);

    const handleChange = (event) => {
        setContent(event.target.value);
        
        const index = nodeData.current.findIndex(obj => obj.id == id);
        const updateNodeData = [...nodeData.current];
        updateNodeData[index] = {id: id, value: event.target.value}
        nodeData.current = updateNodeData;
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
        if (!clickedOnNode.current) {
            if (event.target.className === "overlay" && event.ctrlKey) return;
            nodeCustom.current.style.backgroundColor = "rgb(139,195,74)";
            overlay.current.zIndex = "1";
        }
        clickedOnNode.current = false;
    };

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
            <Handle
                type="target"
                position={Position.Top}
                isConnectable={isConnectable}
                style={{ ...cssHandle, translate: "0% -50%", top: "0px", bottom: "auto" }}
            />

            <div className="main-content" >
                <div ref={ overlay } className="overlay" ></div>
                <input
                    ref={ inputContent }
                    type="text"
                    value={content}
                    onChange={handleChange}
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