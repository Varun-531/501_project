// createInternship.js
const express = require('express');
const router = express.Router();

router.get('/create-internship', isAdmin, (req, res) => {
  res.render('createInternship');
});

router.post('/create-internship', isAdmin, async (req, res) => {
  // Handle internship creation logic here
});

module.exports = router;
