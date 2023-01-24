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

const TicketBarChart = () => {
  const [records, setRecords] = useState([]);
  const client = useContext(ClientContext);
  useEffect(() => {
    getTickets();
  }, []);

  const getCountByStatus = async (status) => {
    return new Promise((resolve) => {
      const options = {
        url: `/api/v2/search/count?query=type:ticket status:${status}`,
        type: "GET",
        dataType: "json",
      };
      const res = client.request(options);
      resolve(res);
    });
  };
  const getTickets = async () => {
    const statuses = ["new", "open", "pending", "on-hold", "solved"];
    return Promise.all(
      statuses.map(async (status) => {
        let data = await getCountByStatus(status);
        data.status = status.toUpperCase();
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
        <XAxis dataKey="status" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TicketBarChart;
