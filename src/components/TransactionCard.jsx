import { Box, Flex, Grid, Heading, Input, Text } from '@chakra-ui/react'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { FiDelete } from 'react-icons/fi';
import { IoIosSearch } from 'react-icons/io';
import { LuDelete } from 'react-icons/lu';
import { MdDelete, MdDeleteForever, MdEdit } from 'react-icons/md';
import { TransactionContext } from '../context/TransactionContext';
import api from '../api/api';
import { toaster } from "../components/ui/toaster";

const TransactionCard = ({setFormData}) => {
    const {transactions ,setTransaction,getTransation} =useContext(TransactionContext)

  const [activeFilter, setActiveFilter] = useState("all");
  const [search,setSearch] =useState("");
   const columns = "1.8fr 1.8fr 1.8fr 1.8fr 1.8fr 0.5fr 0.5fr";
  const headers = ["ID", "Date", "Type", "Amount","Category"];
  
const filterCategory = activeFilter ==='all' ? transactions : transactions.filter((item) =>(item.type.toLowerCase().includes(activeFilter.toLowerCase())))
 const searchedFunction = filterCategory.filter((item)=>(String(item.id).includes(search) || item.category.toLowerCase().includes(search.toLowerCase())));
    const allCount = transactions.length
    const incomeCount = transactions.filter((item) =>(item.type.toLowerCase().includes("income"))).length;
    const expenseCount = transactions.filter((item) =>(item.type.toLowerCase().includes("expense"))).length;
    const handleDelete=async(id)=>{
      try {
       const token=localStorage.getItem('token');
      const response = await api.delete(`/transactions/${id}`);
      console.log(response.data);
      toaster.create({
    title: "Transaction deleted successfully",
    type: "success",
});
      setTransaction(   
    transactions.filter((item)=>{
      return  item.id !==response.data.id
      })
        
      )
     

      } catch (error) {
        toaster.create({
    title: error.response?.data?.message || "Something went wrong",
    type: "error",
});
      }
    }
    

const filter = [
    {
    id :1,
    title : 'ALL',
    type:'all',
    count : allCount,
  },
   {
    id :2,
    title : "Income",
    type:'income',
    count : incomeCount,
  },
   {
    id :3,
    title : 'Expense',
    type:'expense',
    count : expenseCount,
  },
]
  return (
    <Flex w='100%' direction='column'>
    <Flex w='100%' direction='column'>
    <Heading>Your Transaction</Heading>
        <Flex justify="space-between" 
              align="center"
              gap={{base : '6'}}
              direction={{base : 'column' , md : 'row'}}

              > <Flex gap={{base : '5' ,  lg : '10'}}>
                {filter.map((item) => (
                 <Flex    key={item.id} 
                 >
                 <Flex 
                    cursor="pointer"
                    align="center"
                    gap="1"
                    pb="1"
                    borderBottomWidth={item.type === activeFilter ? "2px" : "0"}
                    borderBottomColor={item.type === activeFilter ? "purple" : "white"}
                    transition="0.2s"
                    onClick={() => setActiveFilter(item.type)}
                  >
                    <Text fontSize="sm">{item.title}</Text>
                    <Box color="#797E82" bg="#F3F3F7" borderRadius="lg" 
                    fontSize="xs" px="1" w="fit-content" h="fit-content" textAlign="center">
                      {item.count}   
                    </Box>
                  </Flex>
                  </Flex>
                ))}
</Flex>
                <Box position="relative"
                w={{base : '100%' ,md : '200px'}}
                >
                  <Input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Search by ID or destination"
                   pl="30px" 
                   size="xs"
                   borderRadius="lg" />
                  <Box position="absolute" top="8px" left="10px" color="black">
                    <IoIosSearch />
                  </Box>
                </Box>
              </Flex>

               <Box borderColor="#EEEEF4" borderBottomWidth="1px" mt={3} mb={3}>
                <Grid templateColumns={columns}>
                  {headers.map((item, index) => (
                    <Text 
                    display={{base : 'none' , md : 'block'}}
                     key={index} color="black" fontSize="sm">{item}</Text>
                  ))}
                </Grid>
              </Box>
              <Flex gap='6' direction='column'
              >
              {
              searchedFunction.length === 0 ?  <Box color='red'
              w='100%'
              textAlign='center'
              display={{base : 'none' ,md : 'block'}}
              >
                No Transaction Found
              </Box>:searchedFunction.map((item) =>(
                <Box  key={item.id}
                 display={{base : 'none' ,md : 'block'}}
                borderColor="#EEEEF4" borderBottomWidth="1px">
                  <Grid templateColumns={columns}>
                    <Heading size='sm'>{item.id}</Heading>
                    <Heading size='sm'>{item.date}</Heading>
                    <Heading size='sm'>{item.type}</Heading>
                    <Heading size='sm'>{item.amount}</Heading>
                    <Heading size='sm'>{item.category}</Heading>
                    <Box cursor='pointer' size='2xl'
                    onClick={()=>{setFormData(item);
                      ;
                    }}>
                    <MdEdit/>
                    </Box>
                    <Box cursor='pointer' size='2xl' onClick={()=>handleDelete(item.id)}>
                    <MdDeleteForever/>
                    </Box>
                    
                  </Grid>
                </Box>
              ) )
              }
      </Flex>
    </Flex>
      <Flex direction='column'
       display={{base : 'block' ,md : 'none'}}
       gap='10'
       bg='transparent'>
        {
          searchedFunction.length===0 ? <Box color='red'
              w='100%'
              textAlign='center'
              display={{base : 'block' ,md : 'none'}}
              >
                No Transaction Found
              </Box> : searchedFunction.map((item)=>(
                <Box key={item.id} bg='gray' 
                borderColor='white'
                borderBottomWidth='1px'>
                <Flex justify='space-between'>
                <Heading size='sm' >{item.id}</Heading>
                <Heading size='sm'>{item.type}</Heading>

                </Flex>
              <Heading size='sm'>{item.date.split('T')[0]}</Heading>
              <Heading size='sm'>{item.category}</Heading>
              <Heading size='sm'>{item.amount}</Heading>
                </Box>
              ))
        }
       </Flex>
    </Flex>
  )
}

export default TransactionCard
