const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { validationResult } = require('express-validator');
// Import models
const Staff = require('../modules/staff'); 


require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Create Staff
const createStaff = async (req, res) => {
  const { fullName, email, username, phone, password, role, permissions } = req.body;

  try {
    // Check if staff member already exists (by email, username, or phone)
    const existingUser = await Staff.findOne({ $or: [{ email }, { username }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Staff member with this email, username, or phone already exists!' });
    }

    // Validate role
    const validRoles = ['Admin', 'Auditor', 'Cs'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role provided' });
    }

    // Validate email format
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Validate phone number (10-15 digits)
    if (!/^[0-9]{10,15}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number format' });
    }

    // Validate permissions
    const validPermissions = [
      'Manage Projects',
      'Schedule Meetings',
      'Manage Contracts',
      'Manage Support Requests',
      'Manage Web & App',
      'Manage Advertisements'
    ];
    if (permissions && (!Array.isArray(permissions) || permissions.some(p => !validPermissions.includes(p)))) {
      return res.status(400).json({ success: false, message: 'Invalid permissions provided' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new staff member
    const newStaff = new Staff({
      fullName,
      email,
      username,
      phone,
      password: hashedPassword,
      role,
      permissions: permissions || [] // Default to empty array if not provided
    });

    await newStaff.save();
    res.status(201).json({ success: true, message: 'Staff member created successfully', data: newStaff });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error!', error: error.message });
  }
};

// Login staff
const loginStaff = async (req, res) => {
    const { username, password } = req.body;
  
    try {
        const staff = await Staff.findOne({ username });
        if (!staff) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }
        
        const token = jwt.sign({ id: staff._id, role: staff.role, username: staff.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error!' });
    }
};

// Get all staff members
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find(); // Fetch all staff members from the database
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching staff members', error: error.message });
  }
};

// Get a single staff member by ID
const getStaffById = async (req, res) => {
  try {
    const { staffId } = req.params;
    const staff = await Staff.findById(staffId);

    if (!staff) {
      return res.status(404).json({ success: false, message: 'Staff member not found' });
    }

    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching staff member', error: error.message });
  }
};


// Update Staff 
const updateStaff = async (req, res) => {
  try {
      const { staffId } = req.params; // Get staff ID from request params
      let { fullName, email, username, phone, password, role, permissions } = req.body; // Get updated data

      // Find staff member
      const staff = await Staff.findById(staffId);
      if (!staff) {
          return res.status(404).json({ success: false, message: 'Staff member not found' });
      }

      // Check if email, username, or phone already exists for another staff member
      const existingUser = await Staff.findOne({ 
          $or: [{ email }, { username }, { phone }], 
          _id: { $ne: staffId } // Ensure it's not the same staff member
      });
      if (existingUser) {
          return res.status(400).json({ success: false, message: 'Email, username, or phone already in use by another staff member!' });
      }

      // Validate role
      const validRoles = ['Admin', 'Auditor', 'Cs'];
      if (role && !validRoles.includes(role)) {
          return res.status(400).json({ success: false, message: 'Invalid role provided' });
      }

      // Validate email format
      if (email && !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
          return res.status(400).json({ success: false, message: 'Invalid email format' });
      }

      // Validate phone number (10-15 digits)
      if (phone && !/^[0-9]{10,15}$/.test(phone)) {
          return res.status(400).json({ success: false, message: 'Invalid phone number format' });
      }

      // Validate permissions
      const validPermissions = [
          'Manage Projects',
          'Schedule Meetings',
          'Manage Contracts',
          'Manage Support Requests',
          'Manage Web & App',
          'Manage Advertisements'
      ];
      if (permissions && (!Array.isArray(permissions) || permissions.some(p => !validPermissions.includes(p)))) {
          return res.status(400).json({ success: false, message: 'Invalid permissions provided' });
      }

      // Hash password if provided
      if (password) {
          const salt = await bcrypt.genSalt(10);
          password = await bcrypt.hash(password, salt);
      }

      // Update staff member
      const updatedStaff = await Staff.findByIdAndUpdate(
          staffId,
          { fullName, email, username, phone, password, role, permissions },
          { new: true, runValidators: true }
      );

      res.status(200).json({ success: true, message: 'Staff data updated successfully', data: updatedStaff });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Error updating staff data', error: error.message });
  }
};


module.exports = 
{ 
    createStaff,
    loginStaff,
    getAllStaff,
    getStaffById,
    updateStaff 
};
