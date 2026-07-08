const express = require('express');
const {getTransactions, addTransaction, updateTransaction, deleteTransaction }= require('../controller/transactionController');
const { authMiddleware } = require('../middleware/authMIiddleware');
const router = express.Router();

router.get('/',authMiddleware,getTransactions);
router.post('/',authMiddleware,addTransaction);
router.put('/:id',authMiddleware,updateTransaction);
router.delete('/:id',authMiddleware,deleteTransaction);
module.exports=router;