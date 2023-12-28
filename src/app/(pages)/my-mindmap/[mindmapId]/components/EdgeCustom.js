"use client"

import { BaseEdge, getBezierPath } from 'reactflow';

export default function EdgeCustom({ id, sourceX, sourceY, targetX, targetY, selected }) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    const styleEdge = {
        // strokeWidth: "3px",
        // stroke: "#5046E5"
        stroke: selected ? "rgb(55 48 187)" : `rgb(79, 70, 229)`,
        strokeWidth: 3,
        opacity: selected ? "0.7" : "1"
    }

    return (
        <>
            <BaseEdge 
                id={id} 
                path={edgePath} 
                style={ styleEdge }
            />
        </>
    );
}