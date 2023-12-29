"use client"

import { Fragment, useCallback, useEffect, useRef } from "react"
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, useReactFlow, ReactFlowProvider } from "reactflow"

import { useSelector, useDispatch } from "react-redux"
import { fetchMindmapId } from "@/redux/middlewares/fetchMindmapList"

import { usePathname } from "next/navigation"

import MindmapInfo from "./components/MindmapInfo"
import NodeCustomFirst from "./components/NodeCustomFirst"
import NodeCustom from "./components/NodeCustom"
import EdgeCustom from "./components/EdgeCustom"
import { nanoid } from "nanoid"

import 'reactflow/dist/style.css'
import './styleNodeCustom.scss'

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

function MindmapPage() {
    const skipFirst = useRef(false)
    const pathname = usePathname()
    const dispatch = useDispatch()
    const mindmap = useSelector((state) => state.mindmap.mindmap)

    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

    useEffect(() => {
        dispatch(fetchMindmapId(pathname.replace("/my-mindmap/", "")))
    }, [])

    useEffect(() => {
        if (Object.keys(mindmap).length > 0) {
            setNodes(() => {
                let copy = [...mindmap.flow.nodes];
                return copy.map((node) => {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            setNodes,
                        }
                    }
                })
            });

            setEdges(mindmap.flow.edges);
        }
    }, [mindmap])

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
            <MindmapInfo mindmap={mindmap} edges={edges} nodes={nodes} />

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

export default function FlowProvier() {
    return (
        <ReactFlowProvider>
            <MindmapPage />
        </ReactFlowProvider>
    )
}