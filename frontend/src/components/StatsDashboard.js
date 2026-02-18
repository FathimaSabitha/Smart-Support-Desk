import React, { useEffect, useState } from "react";
import API from "../api";

function StatsDashboard({ refresh }) {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    const res = await API.get("tickets/stats/");
    setStats(res.data);
  };

  useEffect(() => {
    fetchStats();
  }, [refresh]);

  if (!stats) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Dashboard</h2>

      <div style={styles.grid}>
        <StatCard title="Total Tickets" value={stats.total_tickets} />
        <StatCard title="Open Tickets" value={stats.open_tickets} />
        <StatCard title="Avg / Day" value={stats.avg_tickets_per_day} />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div style={styles.card}>
      <div style={styles.statTitle}>{title}</div>
      <div style={styles.statValue}>{value}</div>
    </div>
  );
}

export default StatsDashboard;

const styles = {
  container: {
    marginBottom: 30,
  },

  heading: {
    marginBottom: 15,
  },

  grid: {
    display: "flex",
    gap: 20,
  },

  card: {
    flex: 1,
    background: "#fff",
    padding: 20,
    borderRadius: 8,
    border: "1px solid #eee",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },

  statTitle: {
    color: "#666",
    fontSize: 14,
  },

  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
};
