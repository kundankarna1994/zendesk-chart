import React, { useContext, useEffect, useState } from "react";
import ClientContext from "../context/ClientContext";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";

const TicketPriorityBarChart = () => {
  const [records, setRecords] = useState([]);
  const client = useContext(ClientContext);
  useEffect(() => {
    getTickets();
  }, []);

  const getCountByStatus = async (priority) => {
    return new Promise((resolve) => {
      const options = {
        url: `/api/v2/search/count?query=type:ticket priority:${priority}`,
        type: "GET",
        dataType: "json",
      };
      const res = client.request(options);
      resolve(res);
    });
  };
  const getTickets = async () => {
    const priorities = ["urgent", "high", "normal", "low"];
    return Promise.all(
      priorities.map(async (priority) => {
        let data = await getCountByStatus(priority);
        data.name = priority.toUpperCase();
        return data;
      })
    ).then((results) => {
      setRecords(results);
    });
  };
  return (
    <ResponsiveContainer>
      <BarChart data={records}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TicketPriorityBarChart;
