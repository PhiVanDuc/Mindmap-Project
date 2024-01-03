"use client"

import { Fragment, useCallback, useEffect, useRef } from "react"
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, useReactFlow, ReactFlowProvider } from "reactflow"

import MindmapInfo from "./components/MindmapInfo"
import NodeCustomFirst from "./components/NodeCustomFirst"
import NodeCustom from "./components/NodeCustom"
import EdgeCustom from "./components/EdgeCustom"
import { nanoid } from "nanoid"

import 'reactflow/dist/style.css'
import './styleNodeCustom.scss'
import Loading from "@/app/utils/LoadingAnimation"

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

function Flow({ mindmap, session }) {
    const loading = useRef(false);
    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    useEffect(() => {
        setNodes(() => {
            return mindmap.nodes.map((node) => {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        setNodes,
                    }
                }
            })
        });

        setEdges(mindmap.edges);
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
            <MindmapInfo mindmap={mindmap} nodes={ nodes } edges={ edges } session={ session } />

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
                    fitViewOptions={{ maxZoom: 1.5 }}
                    multiSelectionKeyCode = "Control"
                    deleteKeyCode = "Delete"
                    nodeOrigin={[0.5, 0]}
                >
                    <Controls />
                    <MiniMap zoomable pannable nodeStrokeWidth={5} nodeBorderRadius={10} zoomStep={1} nodeColor="#FFCC00" position="top-left" />
                    <Background variant = "dots" color = "#EBE3D5" gap = "30" size = "4" />
                </ReactFlow >
            </div>

            {
                loading.current && <Loading />
            }
        </Fragment>
    )
}

export default function FlowProvier({ mindmap, session }) {
    return (
        <ReactFlowProvider>
            <Flow mindmap={mindmap} session={session}/>
        </ReactFlowProvider>
    )
}