const { data } = require("react-router-dom");
const pool = require("../db");
const { response } = require("express");

const getSummaryDashboard =async(req,res)=>{
try {
    

console.log('your ARE in dashboard controller');
const id=req.user.id
const result = await pool.query(`select sum(case when type='income' then amount else 0 end) as total_income,sum(case when type='expense' then amount else 0 end ) as total_expense from  transactions where user_id=$1`,[id])
console.log(result.rows);
const total_income = Number(result.rows[0].total_income);
const total_expense = Number(result.rows[0].total_expense);
const balance = total_income - total_expense;
const summary ={
    ...result.rows[0],
    balance:balance
}



res.status(200).json({
    data:summary,
    
})
} catch (error) {
       console.log(error.message);

    res.status(500).json({
        message: "Internal Server Error"
    });
}
}
const monthlyChart =async(req,res)=>{
try {
    const id =req.user.id
    const response =await pool.query(`SELECT
    TO_CHAR(DATE_TRUNC('month', date), 'Mon YYYY') AS month,
    SUM(CASE WHEN type='income' THEN amount ELSE 0 END) AS total_income,
    SUM(CASE WHEN type='expense' THEN amount ELSE 0 END) AS total_expense
FROM transactions
WHERE user_id = $1
GROUP BY DATE_TRUNC('month', date)
ORDER BY DATE_TRUNC('month', date) ASC
        `,[id])
        const monthlySummary =response.rows.map((item)=>({
            ...item,
            total_income: Number(item.total_income),
            total_expense:Number(item.total_expense)
        }))

        console.log(monthlySummary);
        res.status(200).json({
            data:monthlySummary,
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Crash"
        })
        console.log(error);
        
    }
}
const categoryChartPie=async(req,res)=>{
    try {
        
  
    const id=req.user.id
    const response =await pool.query(`select category,
        sum(amount) as total from transactions
        where user_id=$1 and type='expense'
        group by category
        order by total desc`,[id])
        const categorySummary=response.rows.map((item)=>({
            total:Number(item.total),
            category:item.category.toUpperCase(),
        }))
        console.log(categorySummary);
        
        res.status(200).json({
            data:categorySummary,
        })
          } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}
module.exports={
    getSummaryDashboard,
    monthlyChart,
    categoryChartPie
}