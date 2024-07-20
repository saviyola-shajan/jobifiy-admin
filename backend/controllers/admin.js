const express = require('express');
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel.js");
const Job =require("../models/jobModel.js")
const Company =require("../models/companyMode.js")
const mongoose = require('mongoose');


//ADMIN CONTROLLERS

const loginAdmin = (async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("please add all fields");
    }
    
    const admin = await Admin.findOne({ email });
  
    if (!admin) {
      res.status(400);
      throw new Error("No admin found with this email!");
    }
  
    if (Admin && password === admin.password) {
      res.json({
        _id: admin.id,
        name: admin.name,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  });

    //Generate JWT token
    const generateToken=(id)=>{
        return jwt.sign({id},process.env.JWT_SECRET,{
            expiresIn:'10d'
        })
      }

      //COMPANY CONTROLLERS

      const addCompany=(async (req, res) => {
        const { companyName, email, phoneNumber, address } = req.body;
    
        try {
            let company = await Company.findOne({ email });
            if (company) {
                return res.status(400).json({ msg: 'Company already exists' });
            }
            company = new Company({
                companyName,
                email,
                phoneNumber,
                address
            });
    
            await company.save();
    
            res.status(201).json({company});
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

    const deleteCompany=(async (req, res) => {
        try {
            const company = await Company.findById(req.params.id);
    
            if (!company) {
                return res.status(404).json({ msg: 'Company not found' });
            }
    
            await Company.deleteOne({_id:req.params.id})
    
            res.json({ msg: 'Company removed' });
        } catch (err) {
            console.error(err.message);
            if (err.kind === 'ObjectId') {
                return res.status(404).json({ msg: 'Company not found' });
            }
            res.status(500).send('Server error');
        }
    });


    const updateCompany=(async (req, res) => {
        const { companyName, email, phoneNumber, address } = req.body;

        const companyFields = {};
        if (companyName) companyFields.companyName = companyName;
        if (email) companyFields.email = email;
        if (phoneNumber) companyFields.phoneNumber = phoneNumber;
        if (address) companyFields.address = address;
    
        try {
            let company = await Company.findById(req.params.id);
    
            if (!company) return res.status(404).json({ msg: 'Company not found' });
    
            company = await Company.findByIdAndUpdate(
                req.params.id,
                { $set: companyFields },
                { new: true }
            );
    
            res.json(company);
        } catch (err) {
            console.error(err);
            res.status(500).send('Server error');
        }
    });

    const getCompanies=(async (req, res) => {
        try {
            const companies = await Company.find();
            res.json(companies);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });


    // JOBS CONTROLLERS

   const addJob=( async (req, res) => {
        const { title, description, company,location,salary } = req.body;
      
        if (!mongoose.Types.ObjectId.isValid(company)) {
            return res.status(400).json({ error: 'Invalid company ID' });
          }
        
          const job = new Job({
            title,
            description,
            company,
            location,
            salary
          });
        
          try {
            const savedJob = await job.save();
            res.status(201).json(savedJob);
          } catch (error) {
            console.error('Error saving job:', error);
            res.status(400).json({ error: error.message });
          }
        });

const getAllJobs=(async (req, res) => {
    try {
        const jobs = await Job.find().populate('company', 'companyName');
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



const updateJob=( async (req, res) => {
    const { title, description, company, location, salary } = req.body;

    const jobFields = {};
    if (title) jobFields.title = title;
    if (description) jobFields.description = description;
    if (company) jobFields.company = company;
    if (location) jobFields.location = location;
    if (salary) jobFields.salary = salary;

    try {
        let job = await Job.findById(req.params.id);

        if (!job) return res.status(404).json({ msg: 'Job not found' });

        job = await Job.findByIdAndUpdate(
            req.params.id,
            { $set: jobFields },
            { new: true }
        );

        res.json(job);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid job ID' });
        }
        res.status(500).send('Server error');
    }
});

const deleteJob=( async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }

        await Job.deleteOne({_id:req.params.id})

        res.json({ msg: 'Job removed' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'Invalid job ID' });
        }
        res.status(500).send('Server error');
    }
});

  module.exports={loginAdmin,addCompany,deleteCompany,getCompanies,updateCompany,addJob,getAllJobs,updateJob,deleteJob}