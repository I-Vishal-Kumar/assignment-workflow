import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "";

export default function HistoryModal({ onClose }) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/history`)
      .then((res) => res.json())
      .then((data) => {
        setHistory(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Chat History</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          {loading ? (
            <div className="modal-loading">
              <div className="loading-spinner" />
              <span>Loading history...</span>
            </div>
          ) : history.length === 0 ? (
            <p className="modal-empty">No saved conversations yet.</p>
          ) : (
            history.map((item) => (
              <div key={item._id} className="history-card">
                <div className="history-prompt">
                  <span className="history-label">Prompt</span>
                  <p>{item.prompt}</p>
                </div>
                <div className="history-response">
                  <span className="history-label">Response</span>
                  <p>{item.response}</p>
                </div>
                <span className="history-date">
                  {new Date(item.createdAt).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
