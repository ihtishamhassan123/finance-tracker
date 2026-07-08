import { useContext } from "react"
import { DashboardContext } from "../context/DashboardContext"
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { Box, Text } from "@chakra-ui/react";
const MonthlyCharts = () => {
    const {monthlySummary} =useContext(DashboardContext)
    console.log(monthlySummary);
    
  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb={4}>
    Monthly Income vs Expense
</Text>
 <ResponsiveContainer  height={300}>
    
  <LineChart data={monthlySummary}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line
      type="monotone"
      dataKey="total_income"
      stroke="#22c55e"
      strokeWidth={2}
    />
    <Line
      type="monotone"
      dataKey="total_expense"
      stroke="#ef4444"
      strokeWidth={2}
    />
  </LineChart>
</ResponsiveContainer>
    </Box>
  
  )
}

export default MonthlyCharts
