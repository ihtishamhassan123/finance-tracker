import { Box, Grid } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SumarryCard from '../components/SumarryCard';
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import {DashboardContext} from '../context/DashboardContext'
import MonthlyCharts from '../components/MonthlyCharts';
import CategoryPieChart from '../components/CategoryPieChart';

const DashboardPages = () => {
const {getDashboardSummary,summary,getMonthlySummary,monthlySummary,getCategoreySummary,categorySummary}=useContext(DashboardContext)
  useEffect(()=>{
    getDashboardSummary()
    getMonthlySummary()
    getCategoreySummary()
  },[])


  const welcomeEmail = localStorage.getItem('token');
  const navigate = useNavigate()
  useEffect(()=>{
  if(welcomeEmail == null){
    navigate('/login')
  }
  },[])
 
  return (
    <Box w='100%'>
     <SumarryCard />
     <Grid
  templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
  gap={6}
  mt='9'
>
  <Box
    p={4}
    bg="white"
    borderRadius="lg"
    shadow="md"
    minH="400px"
  >
    <MonthlyCharts/>
  </Box>

  <Box
    p={4}
    bg="white"
    borderRadius="lg"
    shadow="md"
    minH="400px"
  >
    <CategoryPieChart />
  </Box>
</Grid>
    </Box>
  )
}

export default DashboardPages
