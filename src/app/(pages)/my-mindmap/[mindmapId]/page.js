"use client"

import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, useReactFlow, ReactFlowProvider } from "reactflow"

import MindmapInfo from "./components/MindmapInfo"
import NodeCustomFirst from "./components/NodeCustomFirst"
import NodeCustom from "./components/NodeCustom"
import EdgeCustom from "./components/EdgeCustom"
import { nanoid } from "nanoid"

import 'reactflow/dist/style.css'
import './styleNodeCustom.scss'
import { fetchMindmap } from "@/app/api/actions/handleFetchData"

const nodeTypes = {
    nodeCustomFirst: NodeCustomFirst,
    nodeCustom: NodeCustom
}

const edgeTypes = {
    edgeCustom: EdgeCustom
}

const connectionLineStyle = {
    strokeWidth: "3px",
    stroke: "#5046E5"
};

function MindmapPage({ id }) {
    const mindmap = useRef({});
    const loading = useRef(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    useEffect(() => {
        (async () => {
            loading.current = true;
            const { data } = await fetchMindmap(id);
            loading.current = false;

            mindmap.current = data;

            setNodes(() => {
                return data.nodes.map((node) => {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            setNodes,
                        }
                    }
                })
            });
            setEdges(data.edges);
        })()
    }, [])

    const connectingNodeId = useRef(null);
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback(
        (newEdge) => {
            setEdges((currentEdges) => {
                return addEdge({ ...newEdge, type: "edgeCustom" }, currentEdges)
            })
        },
        [setEdges]
    )

    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId
    }, [])

    const onConnectEnd = useCallback((event) => {
        if (!connectingNodeId.current) return

        const targetIsPane = event.target.classList.contains('react-flow__pane')

        if (targetIsPane) {
            const newNode = {
                id: nanoid(),
                position: screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                }),
                data: {
                    label: `New Node`,
                    setNodes
                },
                type: "nodeCustom",
            }

            const newEdge = {
                id: nanoid(),
                source: connectingNodeId.current,
                target: newNode.id,
                type: "edgeCustom"
            }

            setNodes((currentNodes) => {
                return currentNodes.concat(newNode)
            })

            setEdges((currentEdges) => {
                return currentEdges.concat(newEdge)
            })
        }
    }, [screenToFlowPosition])

    const { getNode } = useReactFlow();
    function shouldNodeBeRemoved(node) {
        if (node.type === 'nodeCustomFirst') return false;
        return true;
    }

    const validateOnNodesChange = (changes) => {
        const nextChanges = changes.reduce((acc, change) => {
            if (change.type === 'remove') {
              const node = getNode(change.id)
      
              if (shouldNodeBeRemoved(node)) {
                return [...acc, change];
              }
              return acc;
            }
            return [...acc, change];
        }, [])
    
        onNodesChange(nextChanges);
    }

    return (
        <Fragment>
            <MindmapInfo mindmap={mindmap} nodes={ nodes } edges={ edges } />

            <div style={{ width: "100vw", height: "70vh" }}>
                <ReactFlow 
                    nodes = { nodes }
                    edges = { edges }
                    onConnect = { onConnect }
                    onNodesChange = { validateOnNodesChange }
                    onEdgesChange = { onEdgesChange }
                    connectionLineStyle={connectionLineStyle}
                    onConnectStart={onConnectStart}
                    onConnectEnd={onConnectEnd}
                    nodeTypes = { nodeTypes }
                    edgeTypes = { edgeTypes }
                    fitView
                    multiSelectionKeyCode = "Control"
                    deleteKeyCode = "Delete"
                    nodeOrigin={[0.5, 0]}
                >
                    <Controls />
                    <MiniMap zoomable pannable nodeStrokeWidth={5} zoomStep={1} />
                    <Background variant = "dots" color = "#EBE3D5" gap = "30" size = "4" />
                </ReactFlow >
            </div>
        </Fragment>
    )
}

export default function FlowProvier({ params }) {
    const { mindmapId: id } = params;
    return (
        <ReactFlowProvider>
            <MindmapPage id={id}/>
        </ReactFlowProvider>
    )
}