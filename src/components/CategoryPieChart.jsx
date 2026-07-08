import React, { useContext } from 'react'
import { DashboardContext } from '../context/DashboardContext'
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import { Box, Text } from '@chakra-ui/react';
const CategoryPieChart = () => {
    const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
];
    const{categorySummary}=useContext(DashboardContext)
    console.log(categorySummary);
    
  return (
    <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
    Expense by Category
</Text>
  <ResponsiveContainer  height={350}>
  <PieChart>
    <Pie
      data={categorySummary}
      dataKey="total"
      nameKey="category"
      cx="50%"
      cy="50%"
      outerRadius={100}
      label
    >
      {categorySummary.map((item, index) => (
        <Cell
          key={index}
          fill={COLORS[index % COLORS.length]}
        />
      ))}
    </Pie>

    <Tooltip />
    <Legend />
  </PieChart>
</ResponsiveContainer>

    </Box>

  )
}

export default CategoryPieChart
