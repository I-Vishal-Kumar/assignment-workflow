import { Handle, Position } from "@xyflow/react";

export default function ResultNode({ data }) {
  const hasResponse = data.response && data.response.trim() !== "";

  return (
    <div className={`custom-node ${data.loading ? "node-loading" : ""}`}>
      <div className="node-header">AI Response</div>
      <div className={`result-text ${!hasResponse && !data.loading ? "placeholder" : ""}`}>
        {data.loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <span className="loading-text">Thinking...</span>
          </div>
        ) : hasResponse ? (
          data.response
        ) : (
          "Response will appear here..."
        )}
      </div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}
