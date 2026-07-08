const pool = require("../db");

const getTransactions =async (req,res) =>{
    try {
       const userID = req.user.id;
        const result = await pool.query('select * from transactions where user_id=$1',[userID]);
    console.log(result.rows);
    res.status(200).json(result.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'server error'})
            }
    
}
const addTransaction = async(req,res) =>{
    try {
        console.log('middware verifird add trasaction');
        
           let {title,amount,date,type, category} = req.body;
    console.log(req.body);
  if(!title || title.length<6){
    res.status(400).json({
        message:"Enter Name Length at least 6 character"
    })
    return
  }
  if(!amount || Number(amount) <= 0){
        res.status(400).json({
            message:"Enter valid amount must be greater than 0"
        })
return
  }
  if(!date){
    const now =new Date();
    date = now.toISOString().split("T")[0]
  }
 if(!category){
    res.status(400).json({
        message:"select the category"
    })
    return
 }
 if(type !=='income' && type !== 'expense' ){
    res.status(400).json({
        message:"select a valid type"
    })
    return
 }
 console.log('trasaction creating');
 const userID = req.user.id;
const result = await pool.query('insert into transactions(title,amount,date,type,category,user_id)values($1,$2,$3,$4,$5,$6)returning *',[title,amount,date,type,category,userID]);
console.log(result.rows[0]);

    res.status(201).json(result.rows[0]);
    
    } catch (error) {
        res.status(500).json({
            message:"internal server crash"
        })
        
    }

}

const updateTransaction = async(req,res)=>{
    try {
    console.log('middware verifird update trasaction');

    const id=Number(req.params.id)
    const {title,amount,date,type,category} = req.body;
    const userID=req.user.id;
    const result = await pool.query('update transactions set title=$1,amount=$2,date=$3,type=$4,category=$5 where id=$6 and user_id =$7 returning*',[title,amount,date,type,category,id,userID] );
    if(result.rowCount ===0){
        res.status(404).json({message:'transaction not found'}
        )
        return;
    }
    res.status(200).json(result.rows[0])
    
    } catch (error) {
        res.status(500).json({
            message:'server error'
        })
    }
  
}
const deleteTransaction =async(req,res)=>{
    try {
                console.log('middware verifird delete trasaction');

 const id = Number(req.params.id);
 const userID= req.user.id;
    const result =await pool.query('delete from transactions where id=$1 and user_id=$2 returning *',[id,userID])
    if( result.rowCount===0){
        res.status(404).json({message:'trasaction not found'})
        return
    }
    res.status(200).json(result.rows[0])
    } catch (error) {
        res.status(500).json({
            message:'server error'
        })
        
    }
    
    
}
module.exports = {getTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
}