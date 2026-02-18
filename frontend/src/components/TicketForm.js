import React, { useState } from "react";
import API from "../api";

function TicketForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [loading, setLoading] = useState(false);

  const classify = async () => {
    if (!description) return;

    setLoading(true);

    try {
      const res = await API.post("tickets/classify/", {
        description,
      });

      setCategory(res.data.suggested_category);
      setPriority(res.data.suggested_priority);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const submit = async () => {
    try {
      await API.post("tickets/", {
        title,
        description,
        category,
        priority,
      });

      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("");

      onCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create Ticket</h2>

      <div style={styles.field}>
        <label>Title</label>
        <input
          style={styles.input}
          placeholder="Enter ticket title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div style={styles.field}>
        <label>Description</label>
        <textarea
          style={styles.textarea}
          placeholder="Describe your issue. Our AI will suggest category and priority."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button style={styles.aiButton} onClick={classify}>
        {loading ? "Classifying..." : "AI Suggest"}
      </button>

      <div style={styles.row}>
        <div style={styles.field}>
          <label>Category</label>
          <select
            style={styles.input}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select category</option>
            <option value="billing">Billing</option>
            <option value="technical">Technical</option>
            <option value="account">Account</option>
            <option value="general">General</option>
          </select>
        </div>

        <div style={styles.field}>
          <label>Priority</label>
          <select
            style={styles.input}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <button style={styles.submitButton} onClick={submit}>
        Submit Ticket
      </button>
    </div>
  );
}

export default TicketForm;


const styles = {
  container: {
    border: "1px solid #ddd",
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    backgroundColor: "#fafafa",
    maxWidth: 600,
  },

  heading: {
    marginBottom: 15,
  },

  field: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 15,
  },

  row: {
    display: "flex",
    gap: 15,
  },

  input: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
  },

  textarea: {
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
    fontSize: 14,
    minHeight: 100,
  },

  aiButton: {
    padding: "8px 14px",
    marginBottom: 15,
    backgroundColor: "#6c63ff",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },

  submitButton: {
    padding: "10px 16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    fontWeight: "bold",
  },
};
