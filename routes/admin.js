// routes/admin.js

const express = require('express');
const router = express.Router();
const { Internship } = require('../models/internships');

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
    // Check if the user is an admin (you need to implement this)
    if (req.user && req.user.is_admin) {
        return next();
    } else {
        res.status(403).send('Permission Denied');
    }
};

// Route to render the admin dashboard
router.get('/dashboard', isAdmin, (req, res) => {
    res.render('admin/dashboard', {
        title: 'Admin Dashboard',
        year: new Date().getFullYear(),
        user: req.user, // Pass the user object to the view if needed
    });
});

// Route to render the form for creating internships
router.get('/create-internship', isAdmin, (req, res) => {
    res.render('admin/createInternship'); // Render a form for creating internships
});

// Route to handle the form submission for creating internships
router.post('/create-internship', isAdmin, async (req, res) => {
    const { title, description, location, start_date, end_date } = req.body;

    try {
        await Internship.create({
            title,
            description,
            location,
            start_date,
            end_date,
        });

        res.redirect('/admin/create-internship');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Add more admin routes as needed

module.exports = router;
