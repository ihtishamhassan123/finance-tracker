import { Box, Button, createListCollection, Field, Flex, Input, Portal, RadioGroup, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { transaction } from '../contransts/transaction'

import axios from 'axios'
import TransactionCard from '../components/TransactionCard'
import { useContext } from 'react'
import { TransactionContext } from '../context/TransactionContext'
import api from '../api/api'
import { toaster } from "../components/ui/toaster";

const TransactionPage = () => {
  const intialState ={
    title : '',
    amount : '',
    date : '',
    type : 'income',
    category : ''
  }
  const [formData , setFormData] = useState(intialState) 
const [error,setError] = useState({});
const [isEdit,setIsEdit] =useState(false)
const incomeCategories = createListCollection({
  items: [
 { label: "Salary", value: "salary" },
  { label: "Freelance", value: "freelance" },
  { label: "Business", value: "business" },
  { label: "Investment", value: "investment" },
  { label: "Rental Income", value: "rental_income" },
  { label: "Bonus", value: "bonus" },
  { label: "Gift", value: "gift" },
  { label: "Other", value: "other" },
  ],
})
const expenseCategories = createListCollection({
  items: [
 { label: "Food", value: "food" },
  { label: "Bills", value: "bills" },
  { label: "Transport", value: "transport" },
  { label: "Shopping", value: "shopping" },
  { label: "Health", value: "health" },
  { label: "Education", value: "education" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Other", value: "other" },
  ],
})
const category = formData.type === 'income' ? incomeCategories : expenseCategories;
  
console.log(formData.category);
const {transactions ,setTransaction,getTransation} =useContext(TransactionContext)
   const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name] : e.target.value
    })
   }
  const radios = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },

]
const id=formData.id;
const addTransaction = async(e) =>{
  try {
 e.preventDefault();
if(!formData.title || formData.title.length < 6){
  setError({
    title : "Enter Title at least have 6 character"
  })
  return
}
if(!formData.amount){
  setError({
    amount : "Enter The valid Amount"
  })
  return
}
if(!formData.category
){
  setError({
    category : "Select the category"
  })
  return
}
setError({});
const token =localStorage.getItem('token')
const response =await api.post('/transactions',formData);
toaster.create({
    title: "Transaction added successfully",
    type: "success",
});
setTransaction([
  ...transactions,
response.data
]
);
setFormData(intialState)

console.log(formData)
  } catch (error) {
toaster.create({
    title: error.response?.data?.message || "Something went wrong",
    type: "error",
});    
  }
}
const updateTransaction = async (e) =>{
  try {
  e.preventDefault();
  const token=localStorage.getItem('token');
  const response =await api.put(`/transactions/${formData.id}`,formData)
  toaster.create({
    title: "Transaction updated successfully",
    type: "success",
});
  setTransaction(transactions.map((item)=> item.id === response.data.id ? response.data :item))

    setFormData(intialState);
  
  } catch (error) {
    toaster.create({
    title: error.response?.data?.message || "Something went wrong",
    type: "error",
});
    
  }
}


console.log(formData.type);

  const welcomeEmail = localStorage.getItem('token')
  const navigate = useNavigate();
  useEffect(()=>{
    if(welcomeEmail === null){
      navigate('/login')

    }
  },[])
  return (
    <Flex direction='column' w='100%'
    mx='auto' gap='3'
    >
 <form onSubmit={formData.id ? updateTransaction : addTransaction} >
 <Flex direction='column'
       w='100%'
       gap={{
        base:'6' ,
        md:'5',
        lg:'4'
       }}
       >
        {
   transaction.map((item)=>(
  <Field.Root key={item.id}>
        <Field.Label>
          {item.label}
        </Field.Label>
        <Input type={item.type} 
        name={item.name}
        value={formData[item.name]}
        border='1px solid black'
        onChange={handleChange}/>
        {

        error[item.name] && (<Text color='red'>{error[item.name]}</Text>)
        }
      </Field.Root >
          ))
        }
        <RadioGroup.Root value={formData.type}  onValueChange={(e)=>setFormData({
          ...formData,
          type : e.value
        })}>

          <Flex justify='space-between'>
            {
              radios.map((item)=>(  <RadioGroup.Item key={item.value} 
                value={item.value}
              >
            <RadioGroup.ItemHiddenInput/>
            <RadioGroup.ItemIndicator/>
            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
          </RadioGroup.Item>))
            }
        
          
          </Flex>
        </RadioGroup.Root>


   <Select.Root maxW='100%' collection={category} value={[formData.category]}  onValueChange={(e)=>setFormData({
    ...formData,
    category :e.value[0],
   })} size="sm" width="320px">
      <Select.HiddenSelect />
      <Select.Label>Select Categorey</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={`Select ${formData.type=== 'income' ? "Income Source" : "Expense Source"}`} />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {category.items.map((framework) => (
              <Select.Item  item={framework} key={framework.value} value={framework.value}>
                {framework.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
{
  error.category && (<Text color='red'
  fontWeight='500'
  transition='0.5s'
 >{error.category}</Text>)
}


       <Button w='100%'
       type='submit'
      >{formData.id ? "Update" : "Add"} Transaction</Button>
       </Flex>
        </form>
        <Box w='100%'
        bg='grey'
        p='3'
        borderRadius='xl'
        mb='2'>
      <TransactionCard setFormData={setFormData}
       transactions={transactions}
        setTransaction={setTransaction} 
        getTransation={getTransation}
        setIsEdit={setIsEdit}/>
        </Box>
      
        </Flex>

        
  )
}

export default TransactionPage
