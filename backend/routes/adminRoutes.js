const express = require('express')
const router = express.Router()
const {protectAdmin}= require("../middleware/auth.js")

const {loginAdmin, addCompany, deleteCompany, getCompanies, updateCompany, getAllJobs, updateJob, deleteJob, addJob} =require("../controllers/admin.js")

router.post('/login',loginAdmin)
router.post('/addcompany',protectAdmin,addCompany)
router.delete('/deletecompany/:id',protectAdmin,deleteCompany)
router.put('/updatecompany/:id',protectAdmin,updateCompany)
router.get("/allcompanies",protectAdmin,getCompanies)
router.post('/addjob',protectAdmin,addJob)
router.delete('/deletejob/:id',protectAdmin,deleteJob)
router.put('/updatejob/:id',protectAdmin,updateJob)
router.get("/alljobs",protectAdmin,getAllJobs)

module.exports=router
