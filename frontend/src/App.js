import React, { useState } from "react";
import TicketForm from "./components/TicketForm";
import TicketList from "./components/TicketList";
import StatsDashboard from "./components/StatsDashboard";

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Smart Support Desk</h1>

      <div style={styles.layout}>
        <div style={styles.left}>
          <TicketForm onCreated={triggerRefresh} />
        </div>

        <div style={styles.right}>
          <StatsDashboard refresh={refresh} />
          <TicketList refresh={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;


const styles = {
  page: {
    padding: 20,
    background: "#f5f6fa",
    minHeight: "100vh",
  },

  title: {
    marginBottom: 20,
  },

  layout: {
    display: "flex",
    gap: 20,
    alignItems: "flex-start",
  },

  left: {
    width: 350,
  },

  right: {
    flex: 1,
  },
};
