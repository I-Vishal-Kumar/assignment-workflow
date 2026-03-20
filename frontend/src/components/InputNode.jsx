import { Handle, Position } from "@xyflow/react";

export default function InputNode({ data }) {
  return (
    <div className="custom-node">
      <div className="node-header">Prompt Input</div>
      <textarea
        value={data.prompt}
        onChange={(e) => data.onPromptChange(e.target.value)}
        placeholder="Type your question here..."
      />
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
