import { useState, useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import InputNode from "./components/InputNode";
import ResultNode from "./components/ResultNode";
import HistoryModal from "./components/HistoryModal";

const API_BASE = import.meta.env.VITE_API_BASE || "";

const initialEdges = [
  {
    id: "e-input-result",
    source: "input-node",
    target: "result-node",
    animated: true,
  },
];

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const nodeTypes = useMemo(
    () => ({ inputNode: InputNode, resultNode: ResultNode }),
    []
  );

  const makeNodes = useCallback(
    () => [
      {
        id: "input-node",
        type: "inputNode",
        position: { x: 50, y: 150 },
        data: { prompt, onPromptChange: setPrompt },
      },
      {
        id: "result-node",
        type: "resultNode",
        position: { x: 550, y: 150 },
        data: { response, loading: false },
      },
    ],
    [prompt, response]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(makeNodes());
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  // Keep nodes in sync with prompt/response state
  const updateNodeData = useCallback(
    (newPrompt, newResponse) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === "input-node") {
            return {
              ...node,
              data: { ...node.data, prompt: newPrompt, onPromptChange: handlePromptChange },
            };
          }
          if (node.id === "result-node") {
            return { ...node, data: { ...node.data, response: newResponse, loading: false } };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const handlePromptChange = useCallback(
    (value) => {
      setPrompt(value);
      updateNodeData(value, response);
    },
    [response, updateNodeData]
  );

  // Initialize nodes with the handler
  useState(() => {
    updateNodeData(prompt, response);
  });

  const handleRun = async () => {
    if (!prompt.trim()) {
      setStatusMsg("Please enter a prompt first.");
      return;
    }

    setLoading(true);
    setStatusMsg("Generating response...");

    // Show loading animation on result node
    setNodes((nds) =>
      nds.map((node) =>
        node.id === "result-node"
          ? { ...node, data: { ...node.data, loading: true, response: "" } }
          : node
      )
    );

    try {
      const res = await fetch(`${API_BASE}/api/ask-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(data.response);
        updateNodeData(prompt, data.response);
        setStatusMsg("Response received!");
      } else {
        setStatusMsg(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatusMsg("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!prompt.trim() || !response.trim()) {
      setStatusMsg("Run a prompt first before saving.");
      return;
    }

    setStatusMsg("Saving...");

    try {
      const res = await fetch(`${API_BASE}/api/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, response }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMsg("Saved to database!");
      } else {
        setStatusMsg(`Error: ${data.error}`);
      }
    } catch (err) {
      setStatusMsg("Failed to save.");
    }
  };

  return (
    <div className="app-container">
      <div className="toolbar">
        <h1>AI Flow</h1>
        <div className="toolbar-actions">
          <button className="btn-run" onClick={handleRun} disabled={loading}>
            {loading && <span className="btn-spinner" />}
            {loading ? "Running..." : "Run Flow"}
          </button>
          <button
            className="btn-save"
            onClick={handleSave}
            disabled={loading || !response}
          >
            Save
          </button>
          <button
            className="btn-history"
            onClick={() => setShowHistory(true)}
          >
            History
          </button>
        </div>
        {statusMsg && <span className="status-msg">{statusMsg}</span>}
      </div>
      <div className="flow-container">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#0f3460" gap={20} />
          <Controls />
        </ReactFlow>
      </div>
      {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
    </div>
  );
}
