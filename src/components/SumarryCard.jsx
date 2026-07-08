import { Box, Flex, Grid, Text } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import { DashboardContext } from '../context/DashboardContext';

const SumarryCard = () => {
    
  
    
  const {summary}=useContext(DashboardContext)
  
      
    
    
    
    // console.log(totalIncome);
    
  return (
    <Grid  minW='100%' gap='4' templateColumns={"1fr 1fr 1fr"} >
     <Flex justify='center'
     direction={{
      base : 'column',md: 'row'
     }}
        py={{base : '8',md:'normal'}}
     px={{base : '0.5',md:'normal'}}
     align='center' color={summary.balance < 0 ? 'red' : "green"}
     h='50px'
     gap='1'
     borderRadius='lg'
     bg={summary.balance < 0 ? 'red.100' : 'green.100'}>
    <Text fontWeight='bold'>Total Balance :</Text>
    <Flex gap='1'>
   <Text>Rs.</Text>{summary.balance}
   </Flex>
     </Flex>
     <Flex justify='center'
     align='center' color='green'
   direction={{
      base : 'column',md: 'row'
     }}
    py={{base : '8',md:'normal'}}
     px={{base : '0.5',md:'normal'}}
     h='50px'
     gap='1'
     borderRadius='lg'
     bg='green.100'>
    <Text fontWeight='bold'>Total Income :</Text>
    <Flex gap='1'>
   <Text>Rs.</Text>{summary.total_income}
   </Flex>
     </Flex>
  <Flex justify='center'
     align='center' color='red'
   direction={{
      base : 'column',md: 'row'
     }}
     py={{base : '8',md:'normal'}}
     px={{base : '0.5',md:'normal'}}
     h='50px'
     gap='1'
     borderRadius='lg'
     bg='red.100'>
     
    <Text fontWeight='bold'>Total Expense :</Text>
    <Flex>
   <Text>Rs.</Text>{summary.total_expense}
   </Flex>
     </Flex>
    </Grid>
  )
}

export default SumarryCard
