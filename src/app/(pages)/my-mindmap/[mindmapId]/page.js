"use client"

import { Fragment, useCallback, useEffect, useRef, useState } from "react"
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, Background, useReactFlow, ReactFlowProvider } from "reactflow"
import { useSelector, useDispatch } from "react-redux"

import { fetchMindmapList } from "@/redux/middlewares/fetchMindmapList"

import MindmapInfo from "./components/MindmapInfo"
import NodeCustomFirst from "./components/NodeCustomFirst"
import NodeCustom from "./components/NodeCustom"
import EdgeCustom from "./components/EdgeCustom"

import { usePathname } from "next/navigation"

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

let id = 0;
const getId = () => `${id++}`;

function MindmapPage() {
    const mindmapList = useSelector((state) => state.mindmap.mindmapList);
    const [currentMindmap, setCurrentMindmap] = useState({});
    const nodeData = useRef([]);
    const pathname = usePathname();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMindmapList());
    }, []);

    useEffect(() => {
        const index = mindmapList.findIndex(obj => `/my-mindmap/${obj.id}` === pathname);

        if (index > -1) {
            nodeData.current = mindmapList[index].nodeData;
            id = +nodeData.current[nodeData.current.length - 1].id + 1;

            const tempMindmap = {
                ...mindmapList[index],
                flow: {
                    ...mindmapList[index].flow,
                    nodes: [
                        ...mindmapList[index].flow.nodes.map((obj) => {
                            return {
                                ...obj,
                                data: {
                                    nodeData
                                }
                            }
                        })
                    ]
                }
            }

            setCurrentMindmap(tempMindmap);
        }
    }, [mindmapList]);

    useEffect(() => {
        if (Object.keys(currentMindmap).length > 0) {
            setNodes(currentMindmap.flow.nodes);
            setEdges(currentMindmap.flow?.edges || []);
        }
    }, [currentMindmap])

    const [nodes, setNodes, onNodesChange] = useNodesState([])
    const [edges, setEdges, onEdgesChange] = useEdgesState([])

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
            const id = getId()

            const newNode = {
                id,
                position: screenToFlowPosition({
                    x: event.clientX,
                    y: event.clientY,
                }),
                data: {
                    nodeData
                },
                type: "nodeCustom",
            }

            const newEdge = {
                id,
                source: connectingNodeId.current,
                target: id,
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

    const onNodesDelete = useCallback(
        (deleted) => {
            deleted.forEach(({ id }) => {
                const index = nodeData.current.findIndex(obj => obj.id === id)
                if (index !== -1) {
                    const newNodeData = [...nodeData.current];
                    newNodeData.splice(index, 1);
                    nodeData.current = newNodeData;
                }
            })
        },
        [nodes, edges]
    );

    return (
        <Fragment>
            <MindmapInfo currentMindmap={ currentMindmap } setCurrentMindmap={ setCurrentMindmap } nodeData={ nodeData } nodes={ nodes } edges={ edges }/>

            <div style={{ width: "100vw", height: "70vh" }}>
                <ReactFlow 
                    nodes = { nodes }
                    edges = { edges }
                    onConnect = { onConnect }
                    onNodesChange = { onNodesChange }
                    onEdgesChange = { onEdgesChange }
                    connectionLineStyle={connectionLineStyle}
                    onConnectStart={onConnectStart}
                    onConnectEnd={onConnectEnd}
                    onNodesDelete={onNodesDelete}
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