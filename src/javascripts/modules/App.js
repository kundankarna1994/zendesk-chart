import React from "react";
import ClientContext from "../context/ClientContext";
import TicketStatusBarChart from "./TicketStatusBarChart";
import TicketPriorityBarChart from "./TicketPriorityBarChart";

const App = ({ client }) => {
  return (
    <ClientContext.Provider value={client}>
      <div style={{ display: "flex", height: "500px" }}>
        <TicketStatusBarChart />
        <TicketPriorityBarChart />
      </div>
    </ClientContext.Provider>
  );
};

export default App;
