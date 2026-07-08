const express = require('express')
const { authMiddleware } = require('../middleware/authMIiddleware')
const { getSummaryDashboard, monthlyChart,categoryChartPie } = require('../controller/dashboardController')

const router=express.Router()


router.get('/',authMiddleware,getSummaryDashboard)
router.get('/monthly',authMiddleware,monthlyChart)
router.get('/category',authMiddleware,categoryChartPie)
module.exports=router
