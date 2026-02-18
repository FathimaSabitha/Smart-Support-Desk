import React, { useEffect, useState } from "react";
import API from "../api";

function TicketList({ refresh }) {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const res = await API.get("tickets/");
    setTickets(res.data);
  };

  useEffect(() => {
    fetchTickets();
  }, [refresh]);

  return (
    <div>
      <h2 style={{ marginBottom: 15 }}>Tickets</h2>

      {tickets.map((t) => (
        <div key={t.id} style={styles.card}>
          <div style={styles.header}>
            <h3 style={{ margin: 0 }}>{t.title}</h3>
            <span style={badgeStyle(t.priority)}>
              {t.priority}
            </span>
          </div>

          <p style={styles.description}>{t.description}</p>

          <div style={styles.meta}>
            <span>Category: {t.category}</span>
            <span>Status: {t.status}</span>
            <span>
              {new Date(t.created_at).toLocaleString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TicketList;


const styles = {
  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    border: "1px solid #eee",
    marginBottom: 15,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  description: {
    color: "#444",
    marginBottom: 10,
  },

  meta: {
    display: "flex",
    gap: 20,
    fontSize: 13,
    color: "#777",
  },
};


function badgeStyle(priority) {
  const colors = {
    low: "#6c757d",
    medium: "#ffc107",
    high: "#fd7e14",
    critical: "#dc3545",
  };

  return {
    background: colors[priority] || "#999",
    color: "#fff",
    padding: "4px 10px",
    borderRadius: 20,
    fontSize: 12,
    textTransform: "capitalize",
  };
}
